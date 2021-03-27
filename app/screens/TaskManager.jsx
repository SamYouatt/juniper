import React, { useState, useEffect } from 'react';
import {
  View, Text, Button, Alert,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import shorthash from 'shorthash';
import { Validator } from 'jsonschema';
import schema from '../../helpers/schema/TaskSchema';
import TaskWidgetEditable from '../components/TaskWidgetEditable';

export default function TaskManager() {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    showDirectory();
  }, [taskList]);

  const importTask = async () => {
    const file = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
      type: 'application/json',
    });
    if (file.type !== 'success') {
      return;
    }
    const name = shorthash.unique(file.name);

    const taskDir = `${FileSystem.documentDirectory}tasks`;
    const dirExists = await FileSystem.getInfoAsync(taskDir);

    if (!dirExists.exists) {
      await FileSystem.makeDirectoryAsync(taskDir);
    }

    const tempDir = `${FileSystem.documentDirectory}temp`;
    const tempdirExists = await FileSystem.getInfoAsync(tempDir);

    if (!tempdirExists.exists) {
      await FileSystem.makeDirectoryAsync(tempDir);
    }

    // copy file to temp internal if doesn't already exist
    const filePath = `${taskDir}/${name}`;
    const tempPath = `${tempDir}/${name}`;
    const alreadyExists = await FileSystem.getInfoAsync(filePath);

    if (alreadyExists.exists) {
      Alert.alert(null, 'File already imported');
    } else {
      const options = { from: file.uri, to: tempPath };
      await FileSystem.copyAsync(options);

      // delete invalid file formats
      const validFile = await validateFile(tempPath);
      if (!validFile) {
        Alert.alert(null, 'Invalid file format');
        await FileSystem.deleteAsync(tempPath, { idempotent: true });
      } else {
        // move to actual location
        await FileSystem.deleteAsync(tempPath, { idempotent: true });
        const finalMove = { from: file.uri, to: filePath };
        await FileSystem.copyAsync(finalMove);
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

  return (
    <View>
      <Text>Task Manager</Text>
      <Button title="Select Document" onPress={importTask} />
      {taskList.length > 0
        ? taskList.map((fileName) => (
          <TaskWidgetEditable fileName={fileName} key={fileName} />
        ))
        : <Text>Start importing tasks to see something here!</Text>}
    </View>
  );
}
