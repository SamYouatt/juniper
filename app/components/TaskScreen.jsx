import React from 'react';
import { View, Text, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export default function TaskScreen() {
  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: false });
    console.log(result);
  };

  return (
    <View>
      <Text>Task</Text>
      <Button title="Select Document" onPress={pickDocument} />
    </View>
  );
}
