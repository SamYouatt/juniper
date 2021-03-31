import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet, Text, View, Button, Modal, Alert,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DateTime } from 'luxon';
import TaskWidget from '../components/TaskWidget';
import PinCode from '../components/PinCode';

export default function HomeScreen({ navigation }) {
  const [scheduledTasks, setScheduledTasks] = useState([]);
  const [unscheduledTasks, setUnscheduledTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const focus = useIsFocused();

  useEffect(() => {
    if (focus) {
      setUnscheduledTasks([]);
      setScheduledTasks([]);
      loadTasks();
    }
  }, [focus]);

  const loadTasks = async () => {
    const allTasks = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}tasks`);

    allTasks.map(async (taskName) => {
      const task = JSON.parse(await FileSystem.readAsStringAsync(`${FileSystem.documentDirectory}tasks/${taskName}`));

      if (!task.completed) {
        const asObject = { task, taskName };
        if (task.scheduled) {
          setScheduledTasks((prevState) => [...prevState, asObject]);
        } else {
          setUnscheduledTasks((prevState) => [...prevState, asObject]);
        }
      }
    });
  };

  const pinCheck = async (pin) => {
    const actualPin = await getPin();
    console.log(actualPin);
    if (pin === actualPin) {
      setModalVisible(false);

      navigation.navigate('Adult');
    } else {
      Alert.alert(null, 'Incorrect pin try again');
    }
  };

  const enterAdultArea = async () => {
    if (await getPin()) {
      setModalVisible(true);
    } else {
      Alert.alert(null, 'Consider setting a pin up');
      navigation.navigate('Adult');
    }
  };

  const getPin = async () => {
    try {
      const value = await AsyncStorage.getItem('pin');
      if (value !== null) {
        return value;
      }
      return null;
    } catch (e) {
      return null;
    }
  };

  const prettyDate = (date) => {
    const dt = DateTime.fromISO(date);

    const weekday = dt.weekdayLong;
    const month = dt.monthLong;
    const day = dt.daysInMonth;
    const time = dt.toLocaleString(DateTime.TIME_24_SIMPLE);
    const formatted = `${weekday}, ${day} ${month} at ${time}`;

    return formatted;
  };

  return (
    <View>
      <Text style={styles.main}>Home screen</Text>
      <Button
        title="Profile"
        onPress={() => {
          navigation.navigate('Profile');
        }}
      />

      <Text>Scheduled Tasks</Text>

      {scheduledTasks.length > 0
        ? scheduledTasks.map((task) => (
          <>
            <Text key={`empty${task.taskName}`}>{prettyDate(task.task.scheduled)}</Text>
            <TaskWidget
              fileName={task.taskName}
              key={task.taskName}
              task={task.task}
              navigation={navigation}
            />
          </>
        ))
        : <Text>No scheduled tasks!</Text>}

      <Text>Unscheduled Tasks</Text>

      {unscheduledTasks.length > 0
        ? unscheduledTasks.map((task) => (
          <TaskWidget
            fileName={task.taskName}
            key={task.taskName}
            task={task.task}
            navigation={navigation}
          />
        ))
        : <Text>No unscheduled tasks!</Text>}

      <Button title="Adult area" onPress={enterAdultArea} />
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Text>Enter pincode</Text>
        <PinCode onSubmit={pinCheck} />
        <Button title="Dismiss" onPress={() => setModalVisible(false)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    fontFamily: 'OpenDyslexic',
    fontSize: 64,
  },
});
