import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colours, Spacing } from '../../styles/Index';

export default function IconButton({ icon, text, buttonAction }) {
  return (

    <View style={styles.container}>
      <TouchableOpacity onPress={buttonAction} style={styles.touchable}>
        <Feather name={icon} size={32} color={Colours['main'].altdark} />
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colours['main'].mid,
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
    color: Colours['main'].altdark,
    fontWeight: 'bold',
  },
});
