import React, { useState, useEffect, useContext } from 'react';
import {
  View, Text, Button, Modal, Alert, StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import PinCode from '../components/PinCode';
import IconButton from '../components/IconButton';
import { SettingsContext } from '../config/SettingsContext';
import { Colours, Spacing, Borders } from '../../styles/Index';

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
      if (key === 'fontSpacing' ?? key === 'fontSize') {
        temp[key] = parseInt(value);
      } else {
        temp[key] = value;
      }
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
    <View style={[styles.container, { backgroundColor: Colours[settings.theme].back }]}>
      <View style={styles.pinbuttons}>
        {!pin && <IconButton icon="lock" buttonAction={addPin} text="Add Pin" />}
        {pin && <IconButton icon="unlock" buttonAction={deletePin} text="Remove Pin" />}
        {pin && <IconButton icon="lock" buttonAction={changePin} text="Change Pin" />}
      </View>

      <View style={styles.setting}>
        <Text style={[styles.settingname, { color: Colours[settings.theme].altdark }]}>Font:</Text>
        <View style={[styles.pickercontainer, { backgroundColor: Colours[settings.theme].mid }]}>
          <Picker
            selectedValue={fontFamily}
            onValueChange={(itemValue) => {
              storeData('fontFamily', itemValue);
              setFontFamily(itemValue);
            }}
            mode="dropdown"
            style={styles.picker}
          >
            <Picker.Item label="Helvetica" value="Helvetica" color={Colours[settings.theme].text} />
            <Picker.Item label="Comic Sans" value="ComicSans" color={Colours[settings.theme].text} />
            <Picker.Item label="Garamond" value="Garamond" color={Colours[settings.theme].text} />
            <Picker.Item label="OpenDyslexic" value="OpenDyslexic" color={Colours[settings.theme].text} />
          </Picker>
        </View>
      </View>

      <View style={styles.setting}>
        <Text style={[styles.settingname, { color: Colours[settings.theme].altdark }]}>
          Font Size:
        </Text>
        <View style={[styles.pickercontainer, { backgroundColor: Colours[settings.theme].mid }]}>
          <Picker
            selectedValue={fontSize}
            onValueChange={(itemValue) => {
              storeData('fontSize', itemValue);
              setFontSize(itemValue);
            }}
            mode="dropdown"
            style={styles.picker}
          >
            <Picker.Item label="Small" value="0.8" color={Colours[settings.theme].text} />
            <Picker.Item label="Medium" value="1.0" color={Colours[settings.theme].text} />
            <Picker.Item label="Large" value="1.2" color={Colours[settings.theme].text} />
          </Picker>
        </View>
      </View>

      <View style={styles.setting}>
        <Text style={[styles.settingname, { color: Colours[settings.theme].altdark }]}>
          Letter Spacing:
        </Text>
        <View style={[styles.pickercontainer, { backgroundColor: Colours[settings.theme].mid }]}>
          <Picker
            selectedValue={fontSpacing}
            onValueChange={(itemValue) => {
              storeData('fontSpacing', itemValue);
              setFontSpacing(itemValue);
            }}
            mode="dropdown"
            style={styles.picker}
          >
            <Picker.Item label="Small" value="0" color={Colours[settings.theme].text} />
            <Picker.Item label="Medium" value="1" color={Colours[settings.theme].text} />
            <Picker.Item label="Large" value="2" color={Colours[settings.theme].text} />
          </Picker>
        </View>
      </View>

      <View style={styles.setting}>
        <Text style={[styles.settingname, { color: Colours[settings.theme].altdark }]}>Theme:</Text>
        <View style={[styles.pickercontainer, { backgroundColor: Colours[settings.theme].mid }]}>
          <Picker
            selectedValue={theme}
            onValueChange={(itemValue) => {
              storeData('theme', itemValue);
              setTheme(itemValue);
            }}
            mode="dropdown"
            style={styles.picker}
          >
            <Picker.Item label="Default" value="main" color={Colours[settings.theme].text} />
            <Picker.Item label="Ocean" value="ocean" color={Colours[settings.theme].text} />
            <Picker.Item label="Peppermint" value="peppermint" color={Colours[settings.theme].text} />
            <Picker.Item label="Dyslexia Sepia" value="dyslexia-sepia" color={Colours[settings.theme].text} />
            <Picker.Item label="Dyslexia Peach" value="dyslexia-peach" color={Colours[settings.theme].text} />
          </Picker>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.outer}>
          <View style={styles.modalcontent}>
            <PinCode onSubmit={pinSubmitted} dismissAction={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.padding.mid,
    alignItems: 'center',
    // backgroundColor: Colours['main'].back,
  },
  pinbuttons: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-evenly',
    marginBottom: Spacing.margin.large,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.padding.mid,
  },
  settingname: {
    flex: 1,
    textAlign: 'right',
    marginRight: Spacing.margin.large,
    fontSize: 24,
    // color: Colours['main'].altdark,
  },
  pickercontainer: {
    flex: 4,
    // backgroundColor: Colours['main'].mid,
    borderRadius: Borders.radius.small,
    marginRight: Spacing.margin.large,
  },
  outer: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalcontent: {
    width: '25%',
    height: '70%',
    backgroundColor: Colours['main'].back,
    borderRadius: Borders.radius.large,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.padding.mid,
  },
});
