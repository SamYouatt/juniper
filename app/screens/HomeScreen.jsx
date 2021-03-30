import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet, Text, View, Button, Modal, Alert,
} from 'react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskWidget from '../components/TaskWidget';
import PinCode from '../components/PinCode';

export default function HomeScreen({ navigation }) {
  const [taskList, setTaskList] = useState([]);
  const [taskNames, setTaskNames] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const focus = useIsFocused();

  useEffect(() => {
    if (focus) {
      setTaskNames([]);
      setTaskList([]);
      loadTasks();
    }
  }, [focus]);

  const loadTasks = async () => {
    const allTasks = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}tasks`);
    const incompleteTasks = [];
    const taskNamesList = [];

    allTasks.map(async (taskName) => {
      const task = JSON.parse(await FileSystem.readAsStringAsync(`${FileSystem.documentDirectory}tasks/${taskName}`));

      if (!task.completed) {
        incompleteTasks.push(task);
        setTaskList((prevState) => [...prevState, task]);
        setTaskNames((prevState) => [...prevState, taskName]);
        taskNamesList.push(taskName);
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

  return (
    <View>
      <Text style={styles.main}>Home screen</Text>
      <Button
        title="Profile"
        onPress={() => {
          navigation.navigate('Profile');
        }}
      />
      {taskNames.length > 0
        ? taskNames.map((fileName, index) => (
          <TaskWidget
            fileName={fileName}
            key={fileName}
            task={taskList[index]}
            navigation={navigation}
          />
        ))
        : <Text>No scheduled tasks!</Text>}
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

      <Button title="test" onPress={() => console.log(taskNames)} />
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
