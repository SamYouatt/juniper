import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import TaskWidget from '../components/TaskWidget';

export default function HomeScreen({ navigation }) {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    displayTasks();
  }, [taskList]);

  const displayTasks = async () => {
    try {
      const contents = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}tasks`);
      setTaskList(contents);
    } catch {
      setTaskList([]);
    }
  };

  return (
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
      {taskList.length > 0
        ? taskList.map((fileName) => (
          <>
            <TaskWidget fileName={fileName} key={fileName} navigation={navigation} />
          </>
        ))
        : <Text>No scheduled tasks!</Text>}
    </View>
  );
}

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
