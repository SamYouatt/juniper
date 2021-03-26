import React, { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';

import { View, Text, Button } from 'react-native';
import TaskWidgetSummary from '../components/TaskWidgetSummary';
import Summary from '../components/Summary';

export default function SummaryScreen() {
  const [completedTasks, setCompletedTasks] = useState([]);
  const tasksDir = `${FileSystem.documentDirectory}tasks`;

  useEffect(() => {
    getAllCompleted();
  }, []);

  const getAllCompleted = async () => {
    try {
      const tasksFolder = await FileSystem.readDirectoryAsync(tasksDir);
      tasksFolder.map((taskName) => checkIfComplete(taskName));
    } catch {
      setCompletedTasks([]);
    }
  };

  const checkIfComplete = async (taskName) => {
    let task = await FileSystem.readAsStringAsync(`${tasksDir}/${taskName}`);
    task = JSON.parse(task);

    if (task.completed) {
      setCompletedTasks((prevState) => [...prevState, task]);
    }
  };

  return (
    <View>
      {completedTasks.length < 1 && <Text>No tasks completed so far</Text>}
      {completedTasks.length > 0 && <Summary tasks={completedTasks} />}
      {completedTasks.length > 0 && completedTasks.map((task) => (
        <TaskWidgetSummary task={task} key={task.name} />
      ))}
    </View>
  );
}
