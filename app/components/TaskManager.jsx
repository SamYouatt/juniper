import React, { useState, useEffect } from 'react';
import {
  View, Text, Button, Alert,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import shorthash from 'shorthash';
import { Validator } from 'jsonschema';
import schema from '../../helpers/schema/TaskSchema';
import TaskWidgetEditable from './TaskWidgetEditable';

export default function TaskManager() {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    showDirectory();
  }, []);

  const importTask = async () => {
    // get file selected from picker and has name
    const file = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
      type: 'application/json',
    });
    if (file.type !== 'success') {
      return;
    }
    const name = shorthash.unique(file.name);
    // make internal tasks directory if not present
    const taskDir = `${FileSystem.documentDirectory}tasks`;
    const dirExists = await FileSystem.getInfoAsync(taskDir);

    if (!dirExists.exists) {
      await FileSystem.makeDirectoryAsync(taskDir);
    }

    // copy file to internal if doesn't already exist
    const filePath = `${taskDir}/${name}`;
    const alreadyExists = await FileSystem.getInfoAsync(filePath);

    if (alreadyExists.exists) {
      Alert.alert(null, 'File already imported');
    } else {
      const options = { from: file.uri, to: filePath };
      await FileSystem.copyAsync(options);

      // delete invalid file formats
      const validFile = await validateFile(filePath);
      if (!validFile) {
        Alert.alert(null, 'Invalid file format');
        await FileSystem.deleteAsync(filePath, { idempotent: true });
      }
    }
  };

  const validateFile = async (path) => {
    const v = new Validator();
    const file = await FileSystem.readAsStringAsync(path);
    const fileContents = JSON.parse(file);

    const isValid = v.validate(fileContents, schema).valid;

    return isValid;
  };

  const showDirectory = async () => {
    try {
      const contents = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}tasks`);
      setTaskList(contents);
    } catch {
      setTaskList([]);
    }
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
      {taskList.length > 0
        ? taskList.map((fileName) => (
          <TaskWidgetEditable fileName={fileName} key={fileName} />
        ))
        : <Text>Start importing tasks to see something here!</Text>}
    </View>
  );
}
