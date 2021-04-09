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

  const textStyling = {
    color: Colours[settings.theme].altdark,
    fontSize: 24 * settings.fontSize,
    fontFamily: settings.fontFamily,
    letterSpacing: settings.fontSpacing,
  };

  return (
    <View style={[styles.container, { backgroundColor: Colours[settings.theme].mid }]}>
      <Text style={[styles.header, {
        color: Colours[settings.theme].altdark,
        fontSize: 24 * settings.fontSize,
        fontFamily: `${settings.fontFamily}-bold`,
        letterSpacing: settings.fontSpacing,
      }]}
      >
        Tasks completed:
      </Text>

      <View style={styles.line}>
        <Text style={[styles.text, textStyling]}>
          Today:
        </Text>
        <Text style={[styles.text, textStyling]}>
          {dayList.length}
        </Text>
      </View>
      <View style={styles.line}>
        <Text style={[styles.text, textStyling]}>
          Week:
        </Text>
        <Text style={[styles.text, textStyling]}>
          {weekList.length}
        </Text>
      </View>
      <View style={styles.line}>
        <Text style={[styles.text, textStyling]}>
          Month:
        </Text>
        <Text style={[styles.text, textStyling]}>
          {monthList.length}
        </Text>
      </View>
      <View style={styles.line}>
        <Text style={[styles.text, textStyling]}>
          Total:
        </Text>
        <Text style={[styles.text, textStyling]}>
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
    justifyContent: 'space-between',
    paddingLeft: Spacing.padding.small,
    paddingRight: Spacing.padding.small,
  },
  header: {
    // color: Colours['main'].altdark,
    // fontSize: 24,
    // fontWeight: 'bold',
    marginBottom: Spacing.margin.mid,
  },
  text: {
    // color: Colours['main'].altdark,
    // fontSize: 24,
  },
});
