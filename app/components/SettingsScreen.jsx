import React from 'react';
import { View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import FontSettings from './FontSettings';
import Summary from './Summary';

export default function SettingsScreen() {
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
        defaultValue="helvetica"
        containerStyle={{ height: 40 }}
        style={{ backgroundColor: '#fafafa' }}
        itemstyle={{ justifyContent: 'flex-start' }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={(item) => console.log(item)}
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
        defaultValue="medium"
        containerStyle={{ height: 40 }}
        style={{ backgroundColor: '#fafafa' }}
        itemstyle={{ justifyContent: 'flex-start' }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={(item) => console.log(item)}
      />
    </View>

  );
}
