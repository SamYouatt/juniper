import React from 'react';
import { View, Text, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const pickDocument = async () => {
  const result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: false });
  const { uri } = result;
  console.log(uri);
};

export default function TaskScreen() {
  return (
    <View>
      <Text>Task</Text>
      <Button title="Select Document" onPress={pickDocument} />
      <Text />
    </View>
  );
}
