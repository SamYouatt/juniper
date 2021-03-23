import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import shorthash from 'shorthash';

export default function TaskManager() {
  const importTask = async () => {
    // Handle selecting file
    const file = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: false });
    const name = shorthash.unique(file.name);
    console.log(file.name);
    console.log(name);

    // Make task directory if doesn't exist
    const taskDir = `${FileSystem.documentDirectory}tasks`;
    const { exists } = await FileSystem.getInfoAsync(taskDir);

    if (!exists) {
      await FileSystem.makeDirectoryAsync(taskDir);
    }

    // Check if already exists in directory
    const filePath = `${taskDir}/${name}`;
    const fileCheck = await FileSystem.getInfoAsync(filePath);

    if (fileCheck.exists) {
      console.log('file already exists');
    } else {
      const options = { from: file.uri, to: filePath };
      await FileSystem.copyAsync(options);
    }

    const contents = await FileSystem.readDirectoryAsync(taskDir);
    console.log(contents);

    // try reading it for testing purposes
    // const fileContents = await FileSystem.readAsStringAsync(filePath);
    // const task = JSON.parse(fileContents);
    // console.log(task.word);
  };

  return (
    <View>
      <Text>Task Manager</Text>
      <Button title="Select Document" onPress={importTask} />
    </View>
  );
}
