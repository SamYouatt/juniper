import React, { useState, useEffect } from 'react';

import {
  View, Text, Button, Alert, Image,
} from 'react-native';

import * as FileSystem from 'expo-file-system';
import shuffle from '../../helpers/Helpers';
import SymbolsIndex from '../../assets/images/symbols/SymbolsIndex';
import UnlockablesIndex from '../../assets/images/unlockables/UnlockablesIndex';

const defaultUnlocks = [...require('../../assets/images/unlockables/unlockedDefault.json')];

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

    const unlockedListPath = `${FileSystem.documentDirectory}unlocks/unlockedList`;
    const unlockedListInfo = await FileSystem.getInfoAsync(unlockedListPath);
    let unlockedList = defaultUnlocks;

    if (!unlockedListInfo.exists) {
      const toSave = JSON.stringify(defaultUnlocks);
      await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}unlocks`);
      await FileSystem.writeAsStringAsync(unlockedListPath, toSave);
    } else {
      unlockedList = JSON.parse(await FileSystem.readAsStringAsync(unlockedListPath));
    }

    if (unlockedList.length < Object.keys(UnlockablesIndex).length) {
      unlockReward(unlockedList, unlockedListPath);
    } else {
      Alert.alert(null, 'All unlocks unlocked');
    }
  };

  const unlockReward = async (unlockedList, unlockedListPath) => {
    const unlocks = Object.keys(UnlockablesIndex);
    const possibleUnlock = unlocks[Math.floor(Math.random() * unlocks.length)];
    if (unlockedList.includes(possibleUnlock)) {
      unlockReward(unlockedList, unlockedListPath);
    } else {
      console.log(`Unlocked ${possibleUnlock}`);
      unlockedList.push(possibleUnlock);
      const toSave = JSON.stringify(unlockedList);
      await FileSystem.writeAsStringAsync(unlockedListPath, toSave);
    }
  };

  // TEST FUNCTION
  const resetUnlocks = async () => {
    const unlockedListPath = `${FileSystem.documentDirectory}unlocks/unlockedList`;
    const toSave = JSON.stringify(defaultUnlocks);
    await FileSystem.writeAsStringAsync(unlockedListPath, toSave);
    console.log('reset unlocks');
  };

  // TEST FUNCTION
  const showUnlocked = async () => {
    const unlockedListPath = `${FileSystem.documentDirectory}unlocks/unlockedList`;
    const fileExists = await FileSystem.getInfoAsync(unlockedListPath);

    if (fileExists.exists) {
      const unlocked = await FileSystem.readAsStringAsync(unlockedListPath);
      console.log(unlocked);
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
      {task.image && task.image in SymbolsIndex && <Image source={SymbolsIndex[`${task.image}`].uri} />}
      {questions[current].answers.map((answer) => (
        {
          ...answer.correct
            ? <Button title={`* ${answer.text ?? ''}`} onPress={rightAnswer} key={answer.text ?? answer.image} />
            : <Button title={answer.text ?? ''} onPress={wrongAnswer} key={answer.text ?? answer.image} />,
        }))}
      <Button title="Reset unlocks" onPress={resetUnlocks} />
      <Button title="Show unlocked list" onPress={showUnlocked} />
    </View>
  );
}
