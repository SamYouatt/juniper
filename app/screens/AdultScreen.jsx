import React, { useState, useEffect, useContext } from 'react';
import {
  View, Text, Button, Modal, Alert, Settings, StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import PinCode from '../components/PinCode';
import SettingsScreen from './SettingsScreen';
import TaskManager from './TaskManager';
import SummaryScreen from './SummaryScreen';
import { SettingsContext } from '../config/SettingsContext';
import { Colours } from '../../styles/Index';

export default function AdultScreen({ navigation }) {
  const [settings] = useContext(SettingsContext);
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          let icon = 'settings';

          if (route.name === 'Summary') {
            icon = 'clipboard';
          } else if (route.name === 'TaskManagement') {
            icon = 'file';
          }

          return <Feather name={icon} color={Colours[settings.theme].altdark} size={24} />;
        },
      })}
      tabBarOptions={{
        style: [styles.tab, { backgroundColor: Colours[settings.theme].altlight }],
        labelStyle: [styles.headers, { color: Colours[settings.theme].text }],
        activeBackgroundColor: Colours[settings.theme].mid,
      }}
    >
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Summary" component={SummaryScreen} />
      <Tab.Screen name="TaskManagement" component={TaskManager} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tab: {
    // backgroundColor: Colours['main'].altlight,
    justifyContent: 'center',
  },
  headers: {
    fontSize: 18,
    // color: Colours['main'].text,
  },
});
