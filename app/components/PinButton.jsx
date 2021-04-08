import React, { useContext } from 'react';

import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import { Colours, Spacing, Borders } from '../../styles/Index';
import { SettingsContext } from '../config/SettingsContext';

export default function PinButton({ text, buttonAction }) {
  const [settings] = useContext(SettingsContext);

  return (
    <View style={[styles.container, { backgroundColor: Colours[settings.theme].mid }]}>
      <TouchableOpacity onPress={buttonAction}>
        <View style={[styles.button, { backgroundColor: Colours[settings.theme].mid }]}>
          <Text style={[styles.text, { color: Colours[settings.theme].altdark }]}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colours['main'].mid,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: 75,
  },
  button: {
    // backgroundColor: Colours['main'].mid,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    // color: Colours['main'].altdark,
  },
});
