import React from 'react';
import {
  View, Text, Image, TouchableHighlight,
} from 'react-native';

export default function Reward({ reward, uri, setPreference }) {
  return (
    <View>
      <TouchableHighlight
        underlayColor="#ffffff"
        onPress={() => setPreference(reward)}
      >
        <Image source={uri} style={{ width: 200, height: 200 }} />
      </TouchableHighlight>
    </View>
  );
}
