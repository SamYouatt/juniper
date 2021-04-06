import React, { useState, useEffect, useContext } from 'react';

import {
  View, Text, Button, StyleSheet,
} from 'react-native';
import { Colours, Borders, Spacing } from '../../styles/Index';
import { SettingsContext } from '../config/SettingsContext';

export default function Summary({ tasks }) {
  const [dayList, setDayList] = useState([]);
  const [weekList, setWeekList] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [settings] = useContext(SettingsContext);

  useEffect(() => {
    tasks.map((task) => putInLists(task));
  }, []);

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

  return (
    <View style={[styles.container, { backgroundColor: Colours[settings.theme].altlight }]}>
      <View style={[styles.period, { backgroundColor: Colours[settings.theme].mid }]}>
        <Text style={[styles.value, { color: Colours[settings.theme].altdark }]}>
          {dayList.length}
        </Text>
        <Text style={[styles.text, { color: Colours[settings.theme].altdark }]}>Day</Text>
      </View>
      <View style={[styles.period, { backgroundColor: Colours[settings.theme].mid }]}>
        <Text style={[styles.value, { color: Colours[settings.theme].altdark }]}>
          {weekList.length}
        </Text>
        <Text style={[styles.text, { color: Colours[settings.theme].altdark }]}>Week</Text>
      </View>
      <View style={[styles.period, { backgroundColor: Colours[settings.theme].mid }]}>
        <Text style={[styles.value, { color: Colours[settings.theme].altdark }]}>
          {monthList.length}
        </Text>
        <Text style={[styles.text, { color: Colours[settings.theme].altdark }]}>Month</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colours['main'].altlight,
    width: '40%',
    height: 125,
    borderRadius: Borders.radius.mid,
    alignItems: 'center',
    padding: Spacing.padding.mid,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  period: {
    // backgroundColor: Colours['main'].mid,
    borderRadius: Borders.radius.mid,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: Spacing.padding.small,
    margin: Spacing.margin.small,
  },
  text: {
    fontSize: 20,
    marginBottom: Spacing.margin.small,
    // color: Colours['main'].altdark,
  },
  value: {
    fontSize: 48,
    fontWeight: 'bold',
    marginTop: Spacing.margin.small,
    // color: Colours['main'].altdark,
  },
});
