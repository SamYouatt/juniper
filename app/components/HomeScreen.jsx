import React from 'react';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';

const HomeScreen = ({ navigation }) => (
  <View>
    <Text>Home screen</Text>
    <Button
      title="Settings"
      onPress={() => {
        navigation.navigate('Settings');
      }}
    />
    <Button
      title="Profile"
      onPress={() => {
        navigation.navigate('Profile');
      }}
    />
    <Button
      title="Task"
      onPress={() => {
        navigation.navigate('Task');
      }}
    />
  </View>
);

export default HomeScreen;
