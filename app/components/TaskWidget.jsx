import React, { useState } from 'react';

import {
  View, Text, TouchableOpacity, Button, StyleSheet, Image,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { DateTime } from 'luxon';
import { Feather } from '@expo/vector-icons';
import SymbolsIndex from '../../assets/images/symbols/SymbolsIndex';
import { Colours, Spacing, Borders } from '../../styles/Index';

export default function TaskWidget({
  fileName, task, navigation, scheduleTask,
}) {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [date, setDate] = useState();

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
    const time = dt.toLocaleString(DateTime.TIME_24_SIMPLE);
    const formatted = `${weekday}, ${day} ${month} at ${time}`;

    return formatted;
  };

  return (
    <View style={styles.container}>

      <View style={styles.left}>
        {task.scheduled
          ? <Text>{prettyDate(task.scheduled)}</Text>
          : <Button title="schedule" onPress={() => setDatePickerVisible(true)} />}
      </View>

      <View style={styles.mid}>
        <TouchableOpacity onPress={loadTask} underlayColor="white" style={styles.task}>
          <View style={styles.imagezone}>
            <Image source={SymbolsIndex[`${task.image}`].uri} style={styles.image} />
          </View>
          <View style={styles.info}>
            <Text style={styles.title}>{task.name}</Text>
            <Text style={styles.details}>{`${task.questions.length} questions`}</Text>
            <Text style={styles.details}>{`${task.time} minutes`}</Text>
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
    width: 1000,
    minHeight: 125,
    flexDirection: 'row',
  },
  left: {
    flex: 2,
    marginRight: 15,
  },
  mid: {
    flex: 8,
  },
  task: {
    flex: 1,
    backgroundColor: Colours['main'].mid,
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
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'center',
  },
  arrowzone: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    borderRadius: Borders.radius.mid,
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 25,
    color: Colours['main'].text,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 5,
  },
  details: {
    fontSize: 18,
    color: Colours['main'].altdark,
  },
});
