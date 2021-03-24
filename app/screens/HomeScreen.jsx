import React from 'react';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';

const HomeScreen = ({ navigation }) => (
  <View>
    <Text style={styles.main}>Home screen</Text>
    <Button
      title="Settings"
      onPress={() => {
        navigation.navigate('Settings');
      }}
    />
    <Button
      title="Task"
      onPress={() => {
        navigation.navigate('Task');
      }}
    />
    <Button
      title="Profile"
      onPress={() => {
        navigation.navigate('Profile');
      }}
    />
    <Button
      title="Summary"
      onPress={() => {
        navigation.navigate('Summary');
      }}
    />
    <Button
      title="Manage Tasks"
      onPress={() => {
        navigation.navigate('TaskManager');
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    fontFamily: 'OpenDyslexic',
    fontSize: 64,
  },
});

export default HomeScreen;
