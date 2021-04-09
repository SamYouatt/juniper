import React from 'react';
import {
  View, Image, TouchableHighlight, StyleSheet,
} from 'react-native';
import { Borders } from '../../styles/Index';

export default function Reward({ reward, uri, setPreference }) {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        underlayColor="#ffffff"
        onPress={() => setPreference(reward)}
      >
        <View style={styles.imagezone}>
          <Image source={uri} style={styles.image} />
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagezone: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
    borderRadius: Borders.radius.mid,
  },
});
