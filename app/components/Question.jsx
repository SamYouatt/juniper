import React, { useState, useEffect } from 'react';

import {
  View, Text, Button, Alert,
} from 'react-native';

import shuffle from '../../helpers/Helpers';

export default function Question({ route, navigation }) {
  const { task } = route.params;
  const { questions } = task;

  questions.map((question) => ({ ...question, answers: shuffle(question.answers) }));

  const numQuestions = task.questions.length;
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

  const rightAnswer = () => {
    console.log('right answer');
    setCurrent(current + 1);
  };

  const wrongAnswer = () => {
    console.log('wrong answer');
  };

  return (
    <View>
      <Text>{task.questions[current].questionText}</Text>
      <Button title="next" onPress={nextQuestion} />
      {questions[current].answers.map((answer) => (
        {
          ...answer.correct
            ? <Button title={answer.text} onPress={rightAnswer} />
            : <Button title={answer.text} onPress={wrongAnswer} />,
        }))}
    </View>
  );
}
