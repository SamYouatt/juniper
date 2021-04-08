import React, { useState, useEffect, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View, Text, Button, StyleSheet,
} from 'react-native';
import { Colours, Spacing, Borders } from '../../styles/Index';
import { SettingsContext } from '../config/SettingsContext';

export default function ProfileAccolade({ tasks }) {
  const [dayList, setDayList] = useState([]);
  const [weekList, setWeekList] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [settings] = useContext(SettingsContext);

  useEffect(() => {
    tasks.map((task) => putInLists(task));
  }, [tasks]);

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
    <View style={[styles.container, { backgroundColor: Colours[settings.theme].mid }]}>
      <Text style={[styles.header, { color: Colours[settings.theme].altdark }]}>
        Tasks completed:
      </Text>

      <View style={styles.line}>
        <Text style={[styles.text, { color: Colours[settings.theme].altdark }]}>
          Today:
        </Text>
        <Text style={[styles.text, { color: Colours[settings.theme].altdark }]}>
          {dayList.length}
        </Text>
      </View>
      <View style={styles.line}>
        <Text style={[styles.text, { color: Colours[settings.theme].altdark }]}>
          Week:
        </Text>
        <Text style={[styles.text, { color: Colours[settings.theme].altdark }]}>
          {weekList.length}
        </Text>
      </View>
      <View style={styles.line}>
        <Text style={[styles.text, { color: Colours[settings.theme].altdark }]}>
          Month:
        </Text>
        <Text style={[styles.text, { color: Colours[settings.theme].altdark }]}>
          {monthList.length}
        </Text>
      </View>
      <View style={styles.line}>
        <Text style={[styles.text, { color: Colours[settings.theme].altdark }]}>
          Total:
        </Text>
        <Text style={[styles.text, { color: Colours[settings.theme].altdark }]}>
          {tasks.length}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colours['main'].mid,
    padding: Spacing.padding.large,
    borderRadius: Borders.radius.mid,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  header: {
    // color: Colours['main'].altdark,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: Spacing.margin.small,
  },
  text: {
    // color: Colours['main'].altdark,
    fontSize: 24,
  },
});
