import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Question from './QuestionScreen';

export default function TaskScreen({ navigation }) {
  const Stack = createStackNavigator();

  const questions = ['question one!', 'question two!'];

  return (
    <View>
      <Text>Task screen</Text>
    </View>
  );
}
