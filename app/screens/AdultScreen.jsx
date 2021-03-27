import React, { useState, useEffect } from 'react';
import {
  View, Text, Button, Modal, Alert, Settings,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PinCode from '../components/PinCode';
import SettingsScreen from './SettingsScreen';
import TaskManager from './TaskManager';
import SummaryScreen from './SummaryScreen';

export default function AdultScreen({ navigation }) {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Summary" component={SummaryScreen} />
      <Tab.Screen name="TaskMangement" component={TaskManager} />
    </Tab.Navigator>
  );
}
