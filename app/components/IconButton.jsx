import { Feather } from '@expo/vector-icons';
import React, { useContext } from 'react';

import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colours, Spacing, Borders } from '../../styles/Index';
import { SettingsContext } from '../config/SettingsContext';

export default function IconButton({ icon, text, buttonAction }) {
  const [settings] = useContext(SettingsContext);

  return (
    <View style={[styles.container, { backgroundColor: Colours[settings.theme].mid }]}>
      <TouchableOpacity onPress={buttonAction} style={styles.touchable}>
        <Feather name={icon} size={32} color={Colours['main'].altdark} />
        <Text style={[styles.text, {
          color: Colours[settings.theme].altdark,
          fontSize: 18 * settings.fontSize,
          letterSpacing: settings.fontSpacing,
          fontFamily: `${settings.fontFamily}-bold`,
        }]}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colours[settings.theme].mid,
    padding: 10,
    borderRadius: Borders.radius.mid,
    minWidth: 150,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  text: {
    // fontFamily: 'Helvetica',
    fontSize: 18,
    marginLeft: 10,
    marginRight: Spacing.margin.small,
    // color: Colours[settings.theme].altdark,
    // fontWeight: 'bold',
  },
});
