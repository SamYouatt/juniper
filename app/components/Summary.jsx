import React, { useState, useEffect } from 'react';

import { View, Text, Button } from 'react-native';

export default function Summary({ tasks }) {
  const [dayList, setDayList] = useState([]);
  const [weekList, setWeekList] = useState([]);
  const [monthList, setMonthList] = useState([]);

  useEffect(() => {
    tasks.map((task) => putInLists(task));
    calculateScores();
  }, []);

  const createSummaries = () => {
    tasks.map((task) => putInLists(task));
  };

  const daysBetween = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return Math.floor((d1 - d2) / (1000 * 3600 * 24));
  };

  const putInLists = (task) => {
    const now = new Date();
    const daysDifference = daysBetween(now, task.dateCompleted);

    if (daysDifference < 30) {
      setMonthList((prevState) => [...prevState, task]);
    }
    if (daysDifference < 7) {
      setWeekList((prevState) => [...prevState, task]);
    }
    if (daysDifference < 1) {
      setDayList((prevState) => [...prevState, task]);
    }
  };

  const calculateScores = () => {

  };

  return (
    <View>
      <Text>Will display summar here</Text>
      <Button title="Test" onPress={createSummaries} />
      <Text>
        Tasks completed today:
        {' '}
        {dayList.length}
      </Text>
      <Text>
        Tasks completed this week:
        {' '}
        {weekList.length}
      </Text>
      <Text>
        Tasks completed this month:
        {' '}
        {monthList.length}
      </Text>
    </View>
  );
}
