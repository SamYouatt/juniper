import { Feather } from '@expo/vector-icons';
import React, { useContext } from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colours, Spacing } from '../../styles/Index';
import { SettingsContext } from '../config/SettingsContext';

export default function IconButton({ icon, text, buttonAction }) {
  const [settings] = useContext(SettingsContext);

  return (

    <View style={[styles.container, { backgroundColor: Colours[settings.theme].mid }]}>
      <TouchableOpacity onPress={buttonAction} style={styles.touchable}>
        <Feather name={icon} size={32} color={Colours[settings.theme].altdark} />
        <Text style={[styles.text, { color: Colours[settings.theme].altdark }]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colours['main'].mid,
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
    margin: Spacing.margin.small,
  },
  touchable: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Helvetica',
    fontSize: 18,
    marginTop: Spacing.margin.small,
    // color: Colours['main'].altdark,
    fontWeight: 'bold',
  },
});
