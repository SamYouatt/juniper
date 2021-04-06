import React, { useState, useEffect, useContext } from 'react';
import {
  View, Text, Button, Modal, Alert,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PinCode from '../components/PinCode';
import { SettingsContext } from '../config/SettingsContext';

export default function SettingsScreen() {
  const [fontFamily, setFontFamily] = useState('Helvetica');
  const [fontSize, setFontSize] = useState('1');
  const [fontSpacing, setFontSpacing] = useState('1');
  const [theme, setTheme] = useState('main');
  const [pin, setPin] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [settings, setSettings] = useContext(SettingsContext);

  useEffect(() => {
    getData('fontFamily').then((value) => setFontFamily(value));
    getData('fontSize').then((value) => setFontSize(value));
    getData('fontSpacing').then((value) => setFontSpacing(value));
    getData('theme').then((value) => setTheme(value));
    getPin();
  }, []);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      const temp = { ...settings };
      temp[key] = value;
      setSettings(temp);
    } catch (e) {
      Alert.alert(null, 'Something went wrong please try again');
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
      {pin
        ? <Button title="Change pin" onPress={changePin} />
        : <Button title="Add pin" onPress={addPin} />}

      <Button title="delete pin" onPress={deletePin} />
      <Button title="test" onPress={() => console.log(pin)} />

      <Text>Text Settings</Text>
      <Text>Font</Text>
      <DropDownPicker
        items={[
          { label: 'Sans-Serif', value: 'sans-serif', untouchable: true },
          { label: 'Helvetica', value: 'Helvetica', parent: 'sans-serif' },
          { label: 'Comic Sans', value: 'ComicSans', parent: 'sans-serif' },
          { label: 'Serif', value: 'serif', untouchable: true },
          { label: 'Garamond', value: 'Garamond', parent: 'serif' },
          { label: 'Dyslexic Friendly', value: 'dyslexic', untouchable: true },
          { label: 'OpenDyslexic', value: 'OpenDyslexic', parent: 'dyslexic' },
        ]}
        defaultValue={fontFamily}
        containerStyle={{ height: 40 }}
        style={{ backgroundColor: '#fafafa' }}
        itemstyle={{ justifyContent: 'center' }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={(item) => storeData('fontFamily', item.value)}
      />

      <Text>Font Size</Text>
      <DropDownPicker
        items={[
          { label: 'small', value: '0.8' },
          { label: 'medium', value: '1' },
          { label: 'large', value: '1.2' },
        ]}
        defaultValue={fontSize}
        containerStyle={{ height: 40 }}
        style={{ backgroundColor: '#fafafa' }}
        itemstyle={{ justifyContent: 'flex-start' }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={(item) => storeData('fontSize', item.value)}
      />

      <Text>Letter Spacing</Text>
      <DropDownPicker
        items={[
          { label: 'small', value: '0.8' },
          { label: 'medium', value: '1' },
          { label: 'large', value: '1.2' },
        ]}
        defaultValue={fontSpacing}
        containerStyle={{ height: 40 }}
        style={{ backgroundColor: '#fafafa' }}
        itemstyle={{ justifyContent: 'flex-start' }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={(item) => storeData('fontSpacing', item.value)}
      />

      <Text>Theme</Text>
      <DropDownPicker
        items={[
          { label: 'Default', value: 'main' },
          { label: 'Ocean', value: 'ocean' },
          { label: 'Peppermint', value: 'peppermint' },
          { label: 'Dyslexia Sepia', value: 'dyslexia-sepia' },
          { label: 'Dyslexia Peach', value: 'dyslexia-peach' },
        ]}
        defaultValue={theme}
        containerStyle={{ height: 40 }}
        style={{ backgroundColor: '#fafafa' }}
        itemstyle={{ justifyContent: 'flex-start' }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={(item) => storeData('theme', item.value)}
      />

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
