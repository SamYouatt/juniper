import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import shorthash from 'shorthash';
import { Validator } from 'jsonschema';
import schema from '../../helpers/schema/TaskSchema';

export default function TaskManager() {
  const importTask = async () => {
    // get file selected from picker and has name
    const file = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: false });
    const name = shorthash.unique(file.name);

    // make internal tasks directory if not present
    const taskDir = `${FileSystem.documentDirectory}tasks`;
    const { exists } = await FileSystem.getInfoAsync(taskDir);

    if (!exists) {
      await FileSystem.makeDirectoryAsync(taskDir);
    }

    // copy file to internal if doesn't already exist
    const filePath = `${taskDir}/${name}`;
    const fileCheck = await FileSystem.getInfoAsync(filePath);

    if (fileCheck.exists) {
      console.log('file already exists');
    } else {
      const options = { from: file.uri, to: filePath };
      await FileSystem.copyAsync(options);

      // delete invalid file formats
      const validFile = await validateFile(filePath);
      if (!validFile) {
        console.log('not valid format');
        await FileSystem.deleteAsync(filePath, { idempotent: true });
      }
    }
  };

  const validateFile = async (path) => {
    const v = new Validator();
    const file = await FileSystem.readAsStringAsync(path);
    const fileContents = JSON.parse(file);
    console.log(fileContents);

    const isValid = v.validate(fileContents, schema).valid;
    console.log(isValid);

    return isValid;
  };

  const showDirectory = async () => {
    const contents = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}tasks`);
    console.log(contents);
  };

  const clearTasks = async () => {
    await FileSystem.deleteAsync(`${FileSystem.documentDirectory}tasks`);
  };

  return (
    <View>
      <Text>Task Manager</Text>
      <Button title="Select Document" onPress={importTask} />
      <Button title="Test button" onPress={() => validateFile('e')} />
      <Button title="Show tasks directory" onPress={() => showDirectory()} />
      <Button title="Clear tasks directory" onPress={() => clearTasks()} />
    </View>
  );
}

// try reading it for testing purposes
// const fileContents = await FileSystem.readAsStringAsync(filePath);
// const task = JSON.parse(fileContents);
// console.log(task.word);
