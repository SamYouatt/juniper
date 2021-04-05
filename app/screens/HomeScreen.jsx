import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Button, Modal, Alert,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DateTime } from 'luxon';
import TaskWidget from '../components/TaskWidget';
import PinCode from '../components/PinCode';

import { Colours } from '../../styles/Index';
import IconButton from '../components/IconButton';

export default function HomeScreen({ navigation }) {
  const [scheduledTasks, setScheduledTasks] = useState([]);
  const [unscheduledTasks, setUnscheduledTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const focus = useIsFocused();

  useEffect(() => {
    if (focus) {
      refresh();
    }
  }, [focus]);

  const refresh = () => {
    setUnscheduledTasks([]);
    setScheduledTasks([]);
    loadTasks();
  };

  const loadTasks = async () => {
    const allTasks = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}tasks`);

    const unscheduled = [];
    const scheduled = [];

    allTasks.map(async (taskName) => {
      const task = JSON.parse(await FileSystem.readAsStringAsync(`${FileSystem.documentDirectory}tasks/${taskName}`));

      if (!task.completed) {
        const asObject = { task, taskName };
        if (task.scheduled) {
          scheduled.push(asObject);
        } else {
          unscheduled.push(asObject);
        }
      }

      scheduled.sort((a, b) => (a.task.scheduled < b.task.scheduled ? -1 : 1));

      setScheduledTasks([...scheduled]);
      setUnscheduledTasks([...unscheduled]);
    });
  };

  const pinCheck = async (pin) => {
    const actualPin = await getPin();
    console.log(`actual Pin: ${actualPin}`);
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

  const scheduleTask = async (fileName, task, date) => {
    task.scheduled = date;
    const asString = JSON.stringify(task);
    await FileSystem.writeAsStringAsync(`${FileSystem.documentDirectory}tasks/${fileName}`, asString);
    refresh();
  };

  return (
    <View style={styles.container}>

      {scheduledTasks.length > 0 && (
      <View style={styles.top}>
        <Text style={styles.textheader}>Scheduled Tasks</Text>
        {scheduledTasks.map((task) => (
          <View style={styles.task} key={`view${task.taskName}`}>
            <TaskWidget
              fileName={task.taskName}
              key={task.taskName}
              task={task.task}
              navigation={navigation}
            />
          </View>
        ))}
      </View>
      )}

      {unscheduledTasks.length > 0 && (
      <View style={styles.bottom}>
        <Text style={styles.textheader}>Unscheduled Tasks</Text>
        {unscheduledTasks.map((task) => (
          <View style={styles.task} key={`view${task.taskName}`}>
            <TaskWidget
              fileName={task.taskName}
              key={task.taskName}
              task={task.task}
              navigation={navigation}
              scheduleTask={scheduleTask}
            />
          </View>
        ))}
      </View>
      )}

      <View style={styles.profile}>
        <IconButton icon="award" text="Profile" buttonAction={() => navigation.navigate('Profile')} />
      </View>

      <View style={styles.adultarea}>
        <IconButton icon="settings" text="Adult Area" buttonAction={enterAdultArea} />
      </View>

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
    backgroundColor: Colours['main'].back,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  top: {
    flex: 1,
    alignItems: 'center',
  },
  bottom: {
    flex: 1,
    alignItems: 'center',
  },
  main: {
    fontFamily: 'OpenDyslexic',
    fontSize: 64,
  },
  adultarea: {
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
  profile: {
    position: 'absolute',
    top: 25,
    right: 25,
  },
  textheader: {
    fontSize: 32,
    color: Colours['main'].altdark,
    marginBottom: 25,
  },
  task: {
    marginBottom: 15,
  },
});
