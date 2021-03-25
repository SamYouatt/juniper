import React, { useState, useEffect } from 'react';

import { View, Text, Button } from 'react-native';

export default function Question({ route, navigation }) {
  const { task } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: task !== null ? task.name : 'Task' });
  }, [task]);

  return (
    <View>
      <Text>{task.name}</Text>
    </View>
  );
}
