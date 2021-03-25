import React, { useState, useEffect } from 'react';
import {
  View, Text, Alert, TouchableHighlight,
} from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function TaskWidget({ fileName }) {
  const [task, setTask] = useState(null);
  const filePath = `${FileSystem.documentDirectory}tasks/${fileName}`;

  useEffect(() => {
    readFile();
  }, [task]);

  const loadTask = () => {
    console.log('touched!');
    Alert.alert(null, 'pressed button');
  };

  const readFile = async () => {
    try {
      const fileContents = await FileSystem.readAsStringAsync(filePath).then();
      const json = JSON.parse(fileContents);
      setTask(json);
    } catch {
      setTask(null);
    }
  };

  return (
    <View style={{
      paddingTop: 60,
      alignItems: 'center',
    }}
    >
      <TouchableHighlight onPress={loadTask} underlayColor="white">
        {task
          ? (
            <View style={{
              marginBottom: 30,
              width: 260,
              alignItems: 'center',
              backgroundColor: '#fafafa',
            }}
            >
              <Text>{task.name}</Text>
              <Text>
                Questions:
                {' '}
                {task.questions.length}
              </Text>
            </View>
          )
          : <Text>Loading...</Text>}
      </TouchableHighlight>
    </View>
  );
}
