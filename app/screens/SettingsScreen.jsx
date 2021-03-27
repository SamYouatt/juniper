import React, { useState, useEffect } from 'react';
import {
  View, Text, Button, Modal, Alert,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PinCode from '../components/PinCode';

export default function SettingsScreen() {
  const [fontFamily, setFontFamily] = React.useState('helvetica');
  const [fontSize, setFontSize] = React.useState('medium');
  const [pin, setPin] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  React.useEffect(() => {
    getData('font-family').then((value) => setFontFamily(value));
    getData('font-size').then((value) => setFontSize(value));
    getPin();
  }, []);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  };

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      } return null;
    } catch (e) {
      // error reading value
      return null;
    }
  };

  const getPin = async () => {
    try {
      const value = await AsyncStorage.getItem('pin');
      if (value !== null) {
        setPin(value);
      }
    } catch (e) {
      setPin(null);
    }
  };

  const changePin = () => {
    setModalVisible(true);
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
    <View>
      <Text>Text Settings</Text>
      <Text>Font</Text>
      <DropDownPicker
        items={[
          { label: 'Sans-Serif', value: 'sans-serif', untouchable: true },
          { label: 'Helvetica', value: 'helvetica', parent: 'sans-serif' },
          { label: 'Comic Sans', value: 'comicsans', parent: 'sans-serif' },
          { label: 'Serif', value: 'serif', untouchable: true },
          { label: 'Garamond', value: 'garamond', parent: 'serif' },
          { label: 'Dyslexic Friendly', value: 'dyslexic', untouchable: true },
          { label: 'OpenDyslexic', value: 'opendyslexic', parent: 'dyslexic' },
        ]}
        defaultValue={fontFamily}
        containerStyle={{ height: 40 }}
        style={{ backgroundColor: '#fafafa' }}
        itemstyle={{ justifyContent: 'center' }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={(item) => storeData('font-family', item.value)}
      />

      <Text>Font Size</Text>
      <DropDownPicker
        items={[
          { label: 'small', value: 'small' },
          { label: 'medium', value: 'medium' },
          { label: 'large', value: 'large' },
          { label: 'x-large', value: 'xlarge' },
          { label: 'xx-large', value: 'xxlarge' },
        ]}
        defaultValue={fontSize}
        containerStyle={{ height: 40 }}
        style={{ backgroundColor: '#fafafa' }}
        itemstyle={{ justifyContent: 'flex-start' }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={(item) => storeData('font-size', item.value)}
      />

      {pin
        ? <Button title="Change pin" onPress={changePin} />
        : <Button title="Add pin" onPress={addPin} />}

      <Button title="delete pin" onPress={deletePin} />
      <Button title="test" onPress={() => console.log(pin)} />

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Text>Enter pincode</Text>
        <PinCode onSubmit={pinSubmitted} />
        <Button title="Dismiss" onPress={() => setModalVisible(false)} />
      </Modal>
    </View>

  );
}
