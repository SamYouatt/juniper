import React, { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { View, Text, Button } from 'react-native';

export default function TaskWidgetEditable({ fileName }) {
  const [task, setTask] = useState(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [date, setDate] = useState();
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
  return (
    <View>
      {task
        ? (
          <>
            <Text>{task.name}</Text>
            <Text>
              Questions:
              {' '}
              {task.questions.length}
            </Text>
            <Text>
              Scheduled:
              {' '}
              {task.scheduled ?? 'Not scheduled'}
            </Text>
            <Button title="Delete" onPress={deleteFile} />
            <Button title={task.scheduled ? 'Reschedule' : 'Schedule'} onPress={showDatePicker} />
            {task.scheduled && <Button title="Unschedule" onPress={unschedule} />}
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
          </>
        )
        : <Text>Loading...</Text>}

    </View>
  );
}
