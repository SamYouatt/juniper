import React from 'react';
import {
  View, Text, Alert, TouchableHighlight,
} from 'react-native';

export default function TaskWidget({ fileName, task, navigation }) {
  const loadTask = () => {
    navigation.navigate('Question', { task, fileName });
  };

  return (
    <View style={{
      paddingTop: 60,
      alignItems: 'center',
    }}
    >
      <TouchableHighlight onPress={loadTask} underlayColor="white">
        {task
          ? (
            <View style={{
              width: 260,
              alignItems: 'center',
              backgroundColor: '#fafafa',
              borderRadius: 5,
            }}
            >
              <Text>{task.name}</Text>
              <Text>
                Questions:
                {' '}
                {task.questions.length}
              </Text>
            </View>
          )
          : <Text>Loading...</Text>}
      </TouchableHighlight>

    </View>
  );
}
