import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import shorthash from 'shorthash';
import Validator from 'jsonschema';
import schema from '../../helpers/schema/TaskSchema';

export default function TaskManager() {
  const importTask = async () => {
    const file = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: false });
    const name = shorthash.unique(file.name);

    const taskDir = `${FileSystem.documentDirectory}tasks`;
    const { exists } = await FileSystem.getInfoAsync(taskDir);

    if (!exists) {
      await FileSystem.makeDirectoryAsync(taskDir);
    }

    const filePath = `${taskDir}/${name}`;
    const fileCheck = await FileSystem.getInfoAsync(filePath);

    if (fileCheck.exists) {
      console.log('file already exists');
    } else {
      const options = { from: file.uri, to: filePath };
      await FileSystem.copyAsync(options);
    }
  };

  const validateFile = (contents) => {
    const v = new Validator();

    console.log(v.validate(contents, schema).valid);
    return null;
  };

  return (
    <View>
      <Text>Task Manager</Text>
      <Button title="Select Document" onPress={importTask} />
    </View>
  );
}

// try reading it for testing purposes
// const fileContents = await FileSystem.readAsStringAsync(filePath);
// const task = JSON.parse(fileContents);
// console.log(task.word);
