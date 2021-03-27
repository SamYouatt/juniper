import React, { useState, useEffect } from 'react';
import {
  View, Text, Button, Modal, Alert, Settings,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PinCode from '../components/PinCode';
import SettingsScreen from './SettingsScreen';
import TaskManager from './TaskManager';
import SummaryScreen from './SummaryScreen';

export default function AdultScreen({ navigation }) {
  const [pin, setPin] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const Tab = createBottomTabNavigator();

  useEffect(() => {
    getPin();
  }, []);

  const getPin = async () => {
    try {
      const value = await AsyncStorage.getItem('pin');
      if (value !== null) {
        setPin(value);
      }
    } catch (e) {
      // error reading value
      setPin(null);
    }
  };

  const changePin = () => {
    //
    setModalVisible(true);
    console.log('presed');
  };

  const addPin = () => {
    //
    setModalVisible(true);
  };

  const deletePin = async () => {
    try {
      await AsyncStorage.removeItem('pin');
      setPin(null);
    } catch (e) {
      console.log(e);
    }
  };

  const pinSubmitted = async (enteredPin) => {
    try {
      await AsyncStorage.setItem('pin', enteredPin);
      setPin(enteredPin);
      Alert.alert(null, 'Pin updated');
      setModalVisible(false);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  return (
  // <View>
    <Tab.Navigator>
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Summary" component={SummaryScreen} />
      <Tab.Screen name="TaskMangement" component={TaskManager} />
    </Tab.Navigator>
  // <Button
  //   title="Settings"
  //   onPress={() => {
  //     navigation.navigate('Settings');
  //   }}
  // />
  // <Button
  //   title="Summary"
  //   onPress={() => {
  //     navigation.navigate('Summary');
  //   }}
  // />
  // <Button
  //   title="Manage Tasks"
  //   onPress={() => {
  //     navigation.navigate('TaskManager');
  //   }}
  // />
  // {pin
  //   ? <Button title="Change pin" onPress={changePin} />
  //   : <Button title="Add pin" onPress={addPin} />}

  // <Button title="delete pin" onPress={deletePin} />
  // <Button title="test" onPress={() => console.log(pin)} />

  // <Modal
  //   animationType="slide"
  //   transparent={false}
  //   visible={modalVisible}
  //   onRequestClose={() => setModalVisible(false)}
  // >
  //   <Text>Enter pincode</Text>
  //   <PinCode onSubmit={pinSubmitted} />
  //   <Button title="Dismiss" onPress={() => setModalVisible(false)} />
  // </Modal>
  // </View>
  );
}
