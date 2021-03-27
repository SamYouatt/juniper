import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Button, Modal, Alert,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskWidget from '../components/TaskWidget';
import PinCode from '../components/PinCode';

export default function HomeScreen({ navigation }) {
  const [taskList, setTaskList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [pincode, setPincode] = useState(null);
  const [pinSet, setPinSet] = useState(null);

  useEffect(async () => {
    setPinSet(await getPin());
    displayTasks();
  }, []);

  const displayTasks = async () => {
    try {
      const contents = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}tasks`);
      setTaskList(contents);
    } catch {
      setTaskList([]);
    }
  };

  const pinCheck = async (pin) => {
    // await getPin();
    // console.log(pin);
    const actualPin = await getPin();
    console.log(actualPin);
    setPinSet(actualPin);
    if (pin === actualPin) {
      setModalVisible(false);

      navigation.navigate('Adult');
    } else {
      Alert.alert(null, 'Incorrect pin try again');
    }
  };

  const enterAdultArea = async () => {
    setPinSet(await getPin());
    if (await getPin()) {
      setModalVisible(true);
    } else {
      navigation.navigate('Adult');
    }
  };

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  };

  const getPin = async () => {
    try {
      const value = await AsyncStorage.getItem('pin');
      if (value !== null) {
        setPinSet(value);
        return value;
      }
      return null;
    } catch (e) {
      // error reading value
      setPinSet(null);
      return null;
    }
  };

  return (
    <View>
      <Text style={styles.main}>Home screen</Text>
      <Button
        title="Settings"
        onPress={() => {
          navigation.navigate('Settings');
        }}
      />
      <Button
        title="Profile"
        onPress={() => {
          navigation.navigate('Profile');
        }}
      />
      <Button
        title="Summary"
        onPress={() => {
          navigation.navigate('Summary');
        }}
      />
      <Button
        title="Manage Tasks"
        onPress={() => {
          navigation.navigate('TaskManager');
        }}
      />
      {taskList.length > 0
        ? taskList.map((fileName) => (
          <>
            <TaskWidget fileName={fileName} key={fileName} navigation={navigation} />
          </>
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
        {pinSet && <PinCode onSubmit={pinCheck} />}
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
