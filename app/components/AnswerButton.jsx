import React, { useContext } from 'react';

import {
  View, Text, TouchableOpacity, Image, StyleSheet,
} from 'react-native';
import SymbolsIndex from '../../assets/images/symbols/SymbolsIndex';
import { Colours, Borders, Spacing } from '../../styles/Index';
import { SettingsContext } from '../config/SettingsContext';

export default function AnswerButton({ answer, rightAnswer, wrongAnswer }) {
  const [settings] = useContext(SettingsContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: Colours[settings.theme].mid }]}
        onPress={answer.correct ? rightAnswer : wrongAnswer}
      >
        {answer.image && Object.keys(SymbolsIndex).includes(answer.image) && (
        <View style={styles.imagezone}>
          <Image source={SymbolsIndex[answer.image].uri} style={styles.image} />
        </View>
        )}
        {answer.text && (
          <View style={styles.textzone}>
            <Text style={[styles.text, {
              color: Colours[settings.theme].text,
              fontSize: settings.fontSize * 32,
              letterSpacing: settings.fontSpacing,
              fontFamily: settings.fontFamily,
            }]}
            >
              {answer.text}
            </Text>
          </View>
        )}

      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '40%',
    height: 125,
    marginBottom: Spacing.margin.large,
  },
  button: {
    flex: 1,
    borderRadius: Borders.radius.mid,
    padding: Spacing.padding.mid,
    flexDirection: 'row',
    // backgroundColor: Colours['main'].mid,
    justifyContent: 'center',
  },
  imagezone: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textzone: {
    flex: 6,
    justifyContent: 'center',
    marginLeft: Spacing.margin.mid,
  },
  image: {
    borderRadius: Borders.radius.mid,
    height: '100%',
    resizeMode: 'contain',
  },
  text: {
    // fontSize: 32,
    textAlign: 'center',
    // color: Colours['main'].text,
  },
});
