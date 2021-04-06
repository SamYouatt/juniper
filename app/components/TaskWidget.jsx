import React, { useState, useContext } from 'react';

import {
  View, Text, TouchableOpacity, Button, StyleSheet, Image, Settings,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { DateTime } from 'luxon';
import { Feather } from '@expo/vector-icons';
import SymbolsIndex from '../../assets/images/symbols/SymbolsIndex';
import { Colours, Spacing, Borders } from '../../styles/Index';
import IconButton from './IconButton';
import { SettingsContext } from '../config/SettingsContext';

export default function TaskWidget({
  fileName, task, navigation, scheduleTask,
}) {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [date, setDate] = useState();
  const [settings] = useContext(SettingsContext);

  const loadTask = () => {
    navigation.navigate('Question', { task, fileName });
  };

  const handleDateConfirm = async (value) => {
    setDate(value);
    setDatePickerVisible(false);
    setTimePickerVisible(true);
  };

  const handleTimeConfirm = async (dateTime) => {
    setTimePickerVisible(false);

    scheduleTask(fileName, task, dateTime);
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

      <View style={styles.left}>
        {task.scheduled
          ? <Text style={[styles.date, { color: Colours[settings.theme].altdark }]}>{prettyDate(task.scheduled)}</Text>
          : (
            <IconButton icon="calendar" text="Schedule" buttonAction={() => setDatePickerVisible(true)} />
          )}
      </View>

      <View style={styles.mid}>
        <TouchableOpacity onPress={loadTask} underlayColor="white" style={[styles.task, { backgroundColor: Colours[settings.theme].mid }]}>
          {Object.keys(SymbolsIndex).includes(task.image) && (
          <View style={styles.imagezone}>
            <Image source={SymbolsIndex[`${task.image}`].uri} style={styles.image} />
          </View>
          )}
          <View style={styles.info}>
            <Text style={[styles.title, { color: Colours[settings.theme].text }]}>{task.name}</Text>
            <Text style={[styles.details, { color: Colours[settings.theme].altdark }]}>{`${task.questions.length} questions`}</Text>
            <Text style={[styles.details, { color: Colours[settings.theme].altdark }]}>{`${task.time} minutes`}</Text>
          </View>
          <View style={styles.arrowzone}>
            <Feather name="arrow-right" size={48} color={Colours['main'].altdark} />
          </View>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisible(false)}
        minimumDate={new Date(Date.now())}
      />

      <DateTimePickerModal
        isVisible={timePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={() => setTimePickerVisible(false)}
        date={date}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 800,
    minHeight: 125,
    flexDirection: 'row',
  },
  left: {
    flex: 2,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mid: {
    flex: 8,
  },
  task: {
    flex: 1,
    // backgroundColor: Colours[settings.theme].mid,
    borderRadius: Borders.radius.mid,
    padding: Spacing.padding.mid,
    flexDirection: 'row',
  },
  imagezone: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  info: {
    flex: 10,
    marginLeft: 25,
    marginRight: 15,
    justifyContent: 'center',
  },
  arrowzone: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 15,
  },
  image: {
    borderRadius: Borders.radius.mid,
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 25,
    // color: Colours[settings.theme].text,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 5,
  },
  details: {
    fontSize: 18,
    // color: Colours[settings.theme].altdark,
  },
  date: {
    fontSize: 22,
    // color: Colours[settings.theme].altdark,
  },
});
