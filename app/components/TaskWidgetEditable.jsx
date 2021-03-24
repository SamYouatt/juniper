import React, { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { View, Text, Button } from 'react-native';

export default function TaskWidgetEditable({ fileName }) {
  const [task, setTask] = useState(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
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

  const handleDateConfirm = async (date) => {
    console.log(date);
    hideDatePicker();
    showTimePicker();
  };

  const handleTimeConfirm = async (time) => {
    console.log(time);
    hideTimePicker();
  };

  return (
    <View>
      <Text>WIDGET</Text>
      {task
        ? (
          <>
            <Text>{task.name}</Text>
            <Text>
              Questions:
              {' '}
              {task.questions.length}
            </Text>
            <Button title="Delete" onPress={deleteFile} />
            <Button title="Reschedule" onPress={showDatePicker} />
            <DateTimePickerModal
              isVisible={datePickerVisible}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={hideDatePicker}
            />
            <DateTimePickerModal
              isVisible={timePickerVisible}
              mode="time"
              onConfirm={handleTimeConfirm}
              onCancel={hideTimePicker}
            />
          </>
        )
        : <Text>Loading...</Text>}

    </View>
  );
}
