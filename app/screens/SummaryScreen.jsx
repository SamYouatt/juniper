import React, { useState, useEffect, useContext } from 'react';
import * as FileSystem from 'expo-file-system';

import {
  View, Text, Button, StyleSheet, FlatList,
} from 'react-native';
import TaskWidgetSummary from '../components/TaskWidgetSummary';
import Summary from '../components/Summary';
import { Colours, Spacing } from '../../styles/Index';
import { SettingsContext } from '../config/SettingsContext';

export default function SummaryScreen() {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [settings] = useContext(SettingsContext);
  const tasksDir = `${FileSystem.documentDirectory}tasks`;

  useEffect(() => {
    getAllCompleted();
  }, []);

  const getAllCompleted = async () => {
    try {
      const tasksFolder = await FileSystem.readDirectoryAsync(tasksDir);
      const completed = await nameLater(tasksFolder);
      completed.sort((a, b) => (a.dateCompleted < b.dateCompleted ? 1 : -1));
      setCompletedTasks(completed);
    } catch {
      setCompletedTasks([]);
    }
  };

  const nameLater = async (tasksFolder) => {
    const filteredList = [];
    return new Promise((resolve) => {
      tasksFolder.map(async (taskName, i) => {
        let task = await FileSystem.readAsStringAsync(`${tasksDir}/${taskName}`);
        task = JSON.parse(task);

        if (task.completed) {
          filteredList.push(task);
        }
        if (i === tasksFolder.length - 1) {
          resolve(filteredList);
        }
      });
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: Colours[settings.theme].back }]}>
      {completedTasks.length < 1 && <Text>No tasks completed so far</Text>}
      {completedTasks.length > 0 && (
        <View style={styles.summary}>
          <Summary tasks={completedTasks} />
        </View>
      )}
      {completedTasks.length > 0 && (
        <FlatList
          data={[...completedTasks]}
          renderItem={({ item }) => (
            <View style={styles.task} key={`view${item.name}`}>
              <TaskWidgetSummary task={item} key={item.name} />
            </View>
          )}
          keyExtractor={(item) => `list${item.name}`}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: Colours['main'].back,
  },
  summary: {
    marginTop: Spacing.margin.mid,
  },
  task: {
    marginTop: Spacing.margin.mid,
  },
});
