import React, { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';

import { View, Text, Button } from 'react-native';

export default function TaskWidgetEditable({ fileName }) {
  const [task, setTask] = useState([]);
  const filePath = `${FileSystem.documentDirectory}tasks/${fileName}`;

  useEffect(() => {
    readFile();
  }, [task]);

  const readFile = async () => {
    try {
      const fileContents = await FileSystem.readAsStringAsync(filePath).then();
      const json = JSON.parse(fileContents);
      setTask(json);
    } catch {
      setTask([]);
    }
  };

  const deleteFile = async () => {
    const deleted = await FileSystem.deleteAsync(filePath);
  };

  return (
    <View>
      <Text>WIDGET</Text>
      <Text>{task.name}</Text>
      <Button title="Delete" onPress={() => deleteFile()} />
    </View>
  );
}
