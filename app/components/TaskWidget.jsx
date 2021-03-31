import React, { useState } from 'react';

import {
  View, Text, TouchableHighlight, Button,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function TaskWidget({
  fileName, task, navigation, scheduleTask,
}) {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [date, setDate] = useState();

  const loadTask = () => {
    console.log('pressed touchable');
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
    // task.scheduled = dateTime;
    // const stringTask = JSON.stringify(task);
    // await FileSystem.writeAsStringAsync(filePath, stringTask);
  };

  return (
    <View style={{
      paddingTop: 60,
      alignItems: 'center',
    }}
    >
      <TouchableHighlight onPress={loadTask} underlayColor="white">
        {task
          ? (
            <View style={{
              width: 260,
              alignItems: 'center',
              backgroundColor: '#fafafa',
              borderRadius: 5,
            }}
            >
              <Text>{task.name}</Text>
              <Text>
                Questions:
                {' '}
                {task.questions.length}
              </Text>
              {!task.scheduled && <Button title="schedule" onPress={() => setDatePickerVisible(true)} />}
            </View>
          )
          : <Text>Loading...</Text>}
      </TouchableHighlight>

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
