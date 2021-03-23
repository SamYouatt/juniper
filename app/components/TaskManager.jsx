import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

export default function TaskManager() {
  const [uri, setUri] = useState();

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: false });
    const newPath = `file://tasks/${result.name}`;

    // await FileSystem.copyAsync({ from: result.uri, to: newPath });

    const options = { encoding: FileSystem.EncodingType.Base64 };
    // const file = await FileSystem.readAsStringAsync(newPath, options);

    const test = await FileSystem.readDirectoryAsync('file://');

    setUri(result.uri);
    console.log(result);
    console.log(newPath);
    // console.log(file);
    console.log(test);
  };

  const readFile = async (filepath) => {
    const options = { encoding: FileSystem.EncodingType.Base64 };
    const file = await FileSystem.readAsStringAsync(filepath, options);
    console.log(file);
  };

  return (
    <View>
      <Text>Task Manager</Text>
      <Button title="Select Document" onPress={pickDocument} />
    </View>
  );
}
