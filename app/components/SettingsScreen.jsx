import React from 'react';
import { View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export default function SettingsScreen() {
  const [fontFamily, setFontFamily] = React.useState('helvetica');
  const [fontSize, setFontSize] = React.useState('medium');

  React.useEffect(() => {
    getData('font-family').then((value) => setFontFamily(value));
    getData('font-size').then((value) => setFontSize(value));
  }, []);

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
    </View>

  );
}
