import { Feather } from '@expo/vector-icons';
import React, { useContext } from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colours from '../../styles/Colours';
import { SettingsContext } from '../config/SettingsContext';

export default function IconButton({ icon, text, buttonAction }) {
  const [settings, setSettings] = useContext(SettingsContext);

  return (
    <View style={[styles.container, { backgroundColor: Colours[settings.theme].mid }]}>
      <TouchableOpacity onPress={buttonAction} style={styles.touchable}>
        <Feather name={icon} size={32} color={Colours['main'].altdark} />
        <Text style={[styles.text, { color: Colours[settings.theme].altdark }]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colours[settings.theme].mid,
    padding: 10,
    borderRadius: 15,
    minWidth: 150,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Helvetica',
    fontSize: 18,
    marginLeft: 10,
    // color: Colours[settings.theme].altdark,
    fontWeight: 'bold',
  },
});
