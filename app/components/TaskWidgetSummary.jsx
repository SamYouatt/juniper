import React from 'react';
import { View, Text } from 'react-native';

export default function TaskWidgetSummary({ task }) {
  return (
    <View>
      <Text>{task.name}</Text>
    </View>
  );
}
