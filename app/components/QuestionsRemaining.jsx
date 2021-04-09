import React, { useContext } from 'react';

import {
  View, Text, StyleSheet,
} from 'react-native';
import { Colours, Spacing, Borders } from '../../styles/Index';
import { SettingsContext } from '../config/SettingsContext';

export default function QuestionsRemaining({ questions, current }) {
  const [settings] = useContext(SettingsContext);

  return (
    <View style={[styles.container, { backgroundColor: Colours[settings.theme].altlight }]}>
      {(current === questions.length - 1)
        ? (
          <Text style={[styles.text, {
            color: Colours[settings.theme].mid,
            fontFamily: `${settings.fontFamily}-bold`,
            fontSize: 20 * settings.fontSize,
            letterSpacing: settings.fontSpacing,
          }]}
          >
            Final Question!

          </Text>
        )
        : (
          <Text style={[styles.text, {
            color: Colours[settings.theme].mid,
            fontFamily: `${settings.fontFamily}-bold`,
            fontSize: 20 * settings.fontSize,
            letterSpacing: settings.fontSpacing,
          }]}
          >
            {`${questions.length - current} questions left`}

          </Text>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colours['main'].altlight,
    padding: Spacing.padding.mid,
    borderRadius: Borders.radius.mid,
  },
  text: {
    // fontSize: 20,
    // // color: Colours['main'].mid,
    // fontWeight: 'bold',
  },
});
