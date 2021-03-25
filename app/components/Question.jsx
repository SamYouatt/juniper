import React, { useState, useEffect } from 'react';

import {
  View, Text, Button, Alert,
} from 'react-native';

export default function Question({ route, navigation }) {
  const { task } = route.params;
  const numQuestions = task.questions.length;
  console.log(task);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    navigation.setOptions({ title: task !== null ? task.name : 'Task' });
  }, [task]);

  const nextQuestion = () => {
    if (current + 1 !== numQuestions) {
      setCurrent(current + 1);
    } else {
      Alert.alert('NO MORE QUESTIONS');
    }
  };

  return (
    <View>
      <Text>{task.questions[current].questionText}</Text>
      <Button title="next" onPress={nextQuestion} />
    </View>
  );
}
