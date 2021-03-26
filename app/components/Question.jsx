import React, { useState, useEffect } from 'react';

import {
  View, Text, Button, Alert,
} from 'react-native';

import * as FileSystem from 'expo-file-system';
import shuffle from '../../helpers/Helpers';

export default function Question({ route, navigation }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const { task } = route.params;
  const { fileName } = route.params;
  const { questions } = task;
  const numQuestions = task.questions.length;
  const filePath = `${FileSystem.documentDirectory}tasks/${fileName}`;

  questions.map((question) => ({ ...question, answers: shuffle(question.answers) }));

  useEffect(() => {
    navigation.setOptions({ title: task !== null ? task.name : 'Task' });
  }, [task]);

  const nextQuestion = () => {
    if (current + 1 < numQuestions) {
      setCurrent(current + 1);
    } else {
      taskCompleted();
    }
  };

  const rightAnswer = () => {
    setScore(score + 1);
    nextQuestion();
  };

  const wrongAnswer = () => {
    Alert.alert(null, "That's not quite right");
  };

  const taskCompleted = async () => {
    console.log('completed task');
    task.score = score;
    const now = new Date().toJSON();
    task.completed = true;
    task.dateCompleted = now;
    const stringTask = JSON.stringify(task);
    try {
      await FileSystem.writeAsStringAsync(filePath, stringTask);
      navigation.navigate('Home');
    } catch {
      console.log('error writing file');
    }
  };

  return (
    <View>
      {task.questions.length - current === 1
        ? (
          <Text>
            Final question
          </Text>
        )
        : (
          <Text>
            {task.questions.length - current}
            {' '}
            Questions remaining
          </Text>
        )}
      <Text>{task.questions[current].questionText}</Text>
      {questions[current].answers.map((answer) => (
        {
          ...answer.correct
            ? <Button title={`* ${answer.text ?? ''}`} onPress={rightAnswer} key={answer.text ?? answer.image} />
            : <Button title={answer.text ?? ''} onPress={wrongAnswer} key={answer.text ?? answer.image} />,
        }))}
    </View>
  );
}
