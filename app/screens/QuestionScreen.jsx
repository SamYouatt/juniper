import React, { useState, useEffect, useContext } from 'react';
import {
  View, Text, Button, Alert, Image, StyleSheet,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import shuffle from '../../helpers/Helpers';
import SymbolsIndex from '../../assets/images/symbols/SymbolsIndex';
import UnlockablesIndex from '../../assets/images/unlockables/UnlockablesIndex';
import Unlock from '../components/UnlockedReward';
import AnswerButton from '../components/AnswerButton';
import { Spacing, Colours, Borders } from '../../styles/Index';
import QuestionsRemaining from '../components/QuestionsRemaining';
import { SettingsContext } from '../config/SettingsContext';

const defaultUnlocks = [...require('../../assets/images/unlockables/unlockedDefault.json')];

export default function Question({ route, navigation }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [rewardModalVisible, setRewardModalVisible] = useState(false);
  const [unlockedReward, setUnlockedReward] = useState();
  const [settings] = useContext(SettingsContext);
  const [firstGuess, setFirstGuess] = useState(true);

  const { task } = route.params;
  const { fileName } = route.params;
  const { questions } = task;
  const numQuestions = task.questions.length;
  const filePath = `${FileSystem.documentDirectory}tasks/${fileName}`;

  questions.map((question) => ({ ...question, answers: shuffle(question.answers) }));

  useEffect(() => {
    navigation.setOptions({ title: task !== null ? task.name : 'Task' });
  }, [task]);

  useEffect(() => {
    if (score !== 0) {
      nextQuestion();
    }
  }, [score]);

  const nextQuestion = () => {
    if (current + 1 < numQuestions) {
      setCurrent(current + 1);
    } else {
      taskCompleted();
    }
  };

  const rightAnswer = () => {
    if (firstGuess) {
      setScore((prevState) => prevState + 1);
    } else {
      nextQuestion();
    }
    setFirstGuess(true);
  };

  const wrongAnswer = () => {
    setFirstGuess(false);
    setScore(score);
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
      setUnlockedReward(possibleUnlock);
      setRewardModalVisible(true);
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
    <View style={[styles.container, { backgroundColor: Colours[settings.theme].back }]}>
      <View style={styles.questionsleft}>
        <QuestionsRemaining questions={task.questions} current={current} />
      </View>

      <View style={styles.question}>
        {task.questions[current].image
        && Object.keys(SymbolsIndex).includes(task.questions[current].image)
        && (
          <View style={styles.imagezone}>
            <Image source={SymbolsIndex[`${task.questions[current].image}`].uri} style={styles.image} />
          </View>
        )}
        <View style={styles.textzone}>
          <Text style={styles.questiontext}>{task.questions[current].questionText}</Text>
        </View>
      </View>

      <View style={styles.answers}>
        {questions[current].answers.map((answer) => (
          <AnswerButton answer={answer} rightAnswer={rightAnswer} wrongAnswer={wrongAnswer} />
        ))}
      </View>

      <Unlock
        modalVisible={rewardModalVisible}
        unlocked={unlockedReward}
        navigation={navigation}
        setModalVisible={setRewardModalVisible}
      />

      {/* <Button title="Reset unlocks" onPress={resetUnlocks} />
      <Button title="Show unlocked list" onPress={showUnlocked} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.padding.mid,
    // backgroundColor: Colours['main'].back,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionsleft: {
    position: 'absolute',
    bottom: 25,
  },
  question: {
    marginTop: Spacing.margin.large,
    marginBottom: Spacing.margin.large * 2,
    flex: 1,
    flexDirection: 'row',
    width: '80%',
  },
  imagezone: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    borderRadius: Borders.radius.mid,
    height: '100%',
    resizeMode: 'contain',
  },
  textzone: {
    flex: 6,
    justifyContent: 'center',
  },
  questiontext: {
    fontSize: 32,
    lineHeight: 50,
  },
  answers: {
    flex: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  answer: {
    marginBottom: 10,
  },

});
