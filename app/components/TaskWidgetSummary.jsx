import React, { useContext } from 'react';
import {
  View, Text, StyleSheet, Image,
} from 'react-native';
import { DateTime } from 'luxon';
import { Borders, Colours, Spacing } from '../../styles/Index';
import SymbolsIndex from '../../assets/images/symbols/SymbolsIndex';
import { SettingsContext } from '../config/SettingsContext';

export default function TaskWidgetSummary({ task }) {
  const [settings] = useContext(SettingsContext);

  const prettyDate = (iso) => {
    const dt = DateTime.fromISO(iso);

    const weekday = dt.weekdayLong;
    const month = dt.monthLong;
    const { day } = dt;
    const time = dt.toLocaleString(DateTime.TIME_SIMPLE);
    const formatted = `${weekday}, ${day} ${month} at ${time}`;

    return formatted;
  };

  return (
    <View style={[styles.container, { backgroundColor: Colours[settings.theme].mid }]}>
      {Object.keys(SymbolsIndex).includes(task.image) && (
      <View style={styles.imagezone}>
        <Image source={SymbolsIndex[`${task.image}`].uri} style={styles.image} />
      </View>
      )}
      <View style={styles.info}>
        <Text style={[styles.title, { color: Colours[settings.theme].text }]}>{task.name}</Text>
        <Text style={[styles.details, { color: Colours[settings.theme].altdark }]}>{`Completed: ${prettyDate(task.dateCompleted)}`}</Text>
        <Text style={[styles.details, { color: Colours[settings.theme].altdark }]}>{`${task.score}/${task.questions.length}`}</Text>
      </View>
      <View style={styles.right}>
        <Text style={[styles.percentage, { color: Colours[settings.theme].altdark }]}>{`${Math.round((task.score / task.questions.length) * 100)}%`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colours['main'].mid,
    borderRadius: Borders.radius.mid,
    width: 800,
    minHeight: 125,
    flexDirection: 'row',
    padding: Spacing.padding.mid,
  },
  imagezone: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  info: {
    flex: 12,
    marginLeft: 25,
    marginRight: 15,
    justifyContent: 'center',
  },
  right: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: Borders.radius.mid,
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    // color: Colours['main'].text,
  },
  details: {
    fontSize: 18,
    // color: Colours['main'].altdark,
  },
  percentage: {
    fontSize: 25,
    fontWeight: 'bold',
    // color: Colours['main'].altdark,
  },
});
