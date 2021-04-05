import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colours from '../../styles/Colours';

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
    // position: 'absolute',
    // bottom: 25,
    // right: 25,
    backgroundColor: Colours['main'].mid,
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
    color: Colours['main'].altdark,
    fontWeight: 'bold',
  },
});
