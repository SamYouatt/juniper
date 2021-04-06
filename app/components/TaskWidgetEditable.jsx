import React, { useState, useEffect, useContext } from 'react';
import * as FileSystem from 'expo-file-system';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  View, Text, Button, TouchableHighlight, StyleSheet, Image,
} from 'react-native';
import { DateTime } from 'luxon';
import { Colours, Spacing, Borders } from '../../styles/Index';
import SymbolsIndex from '../../assets/images/symbols/SymbolsIndex';
import IconButtonBelow from './IconButtonBelow';
import { SettingsContext } from '../config/SettingsContext';

export default function TaskWidgetEditable({ fileName }) {
  const [task, setTask] = useState(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [date, setDate] = useState();
  const [settings] = useContext(SettingsContext);
  const filePath = `${FileSystem.documentDirectory}tasks/${fileName}`;

  useEffect(() => {
    readFile();
  }, [task]);

  const readFile = async () => {
    try {
      const fileContents = await FileSystem.readAsStringAsync(filePath).then();
      const json = JSON.parse(fileContents);
      setTask(json);
    } catch {
      setTask(null);
    }
  };

  const deleteFile = async () => {
    const deleted = await FileSystem.deleteAsync(filePath);
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleDateConfirm = async (value) => {
    setDate(value);
    hideDatePicker();
    showTimePicker();
  };

  const handleTimeConfirm = async (dateTime) => {
    hideTimePicker();
    task.scheduled = dateTime;
    const stringTask = JSON.stringify(task);
    await FileSystem.writeAsStringAsync(filePath, stringTask);
  };

  const unschedule = async () => {
    task.scheduled = null;
    const stringTask = JSON.stringify(task);
    await FileSystem.writeAsStringAsync(filePath, stringTask);
  };

  const resetTask = async () => {
    task.completed = false;
    task.dateCompleted = null;
    task.score = 0;
    const stringTask = JSON.stringify(task);
    await FileSystem.writeAsStringAsync(filePath, stringTask);
  };

  const prettyDate = (iso) => {
    const dt = DateTime.fromISO(iso);

    const weekday = dt.weekdayLong;
    const month = dt.monthLong;
    const { day } = dt;
    const time = dt.toLocaleString(DateTime.TIME_SIMPLE);
    const formatted = `${weekday}, ${day} ${month} at ${time}`;

    return formatted;
  };

  return (
    <View style={styles.container}>
      {task
        ? (
          <View style={[styles.card, { backgroundColor: Colours[settings.theme].mid }]}>
            {Object.keys(SymbolsIndex).includes(task.image) && (
            <View style={styles.imagezone}>
              <Image source={SymbolsIndex[`${task.image}`].uri} style={styles.image} />
            </View>
            )}
            <View style={styles.info}>
              <Text style={[styles.title, { color: Colours[settings.theme].text }]}>
                {task.name}
              </Text>
              <Text style={styles.details}>{`${task.questions.length} questions`}</Text>
              <Text style={styles.details}>{`${task.scheduled ? `Scheduled: ${prettyDate(task.scheduled)}` : 'Not scheduled'}`}</Text>
              <Text style={styles.details}>{`Completed: ${task.completed ? prettyDate(task.dateCompleted) : 'No'}`}</Text>
            </View>
            <View style={styles.controls}>
              {task.scheduled && <IconButtonBelow icon="x-square" text="Unschedule" buttonAction={unschedule} />}
              {task.completed && <IconButtonBelow icon="rotate-cw" text="Reset" buttonAction={resetTask} />}
              <IconButtonBelow icon="calendar" text="Schedule" buttonAction={showDatePicker} />
              <IconButtonBelow icon="trash" text="Delete" buttonAction={deleteFile} />
            </View>

            <DateTimePickerModal
              isVisible={datePickerVisible}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={hideDatePicker}
              minimumDate={new Date(Date.now())}
            />
            <DateTimePickerModal
              isVisible={timePickerVisible}
              mode="time"
              onConfirm={handleTimeConfirm}
              onCancel={hideTimePicker}
              date={date}
            />
          </View>
        )
        : <Text>Loading...</Text>}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 125,
    flexDirection: 'row',
    marginRight: Spacing.margin.large,
    marginLeft: Spacing.margin.large,
  },
  card: {
    flex: 1,
    // backgroundColor: Colours['main'].mid,
    borderRadius: Borders.radius.mid,
    padding: Spacing.padding.mid,
    flexDirection: 'row',
  },
  imagezone: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  info: {
    flex: 6,
    marginLeft: Spacing.margin.mid,
  },
  controls: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 20,
    // color: Colours['main'].text,
    fontWeight: 'bold',
    marginBottom: Spacing.margin.small,
  },
  details: {
    fontSize: 16,
  },
  image: {
    borderRadius: Borders.radius.mid,
    height: '100%',
    resizeMode: 'contain',
  },
});
