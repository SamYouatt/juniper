import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Colours } from '../../styles/Index';

export default function HeaderLogo() {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo-text-big.png')} style={{ height: 50, width: 275 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // height: 40,
    // backgroundColor: Colours['main'].mid,
  },
});
