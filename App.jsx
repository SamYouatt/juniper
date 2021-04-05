import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet, Text, View, Image,
} from 'react-native';
import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import HomeScreen from './app/screens/HomeScreen';
import SettingsScreen from './app/screens/SettingsScreen';
import ProfileScreen from './app/screens/ProfileScreen';
import SummaryScreen from './app/screens/SummaryScreen';
import TaskManager from './app/screens/TaskManager';
import Question from './app/screens/QuestionScreen';
import AdultScreen from './app/screens/AdultScreen';
import HeaderLogo from './app/components/HeaderLogo';
import Colours from './styles/Colours';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Helvetica': require('./assets/fonts/Helvetica/Helvetica.ttf'),
    'Helvetica-Bold': require('./assets/fonts/Helvetica/Helvetica-Bold.ttf'),
    'ComicSans': require('./assets/fonts/ComicSans/Comic-Sans.ttf'),
    'ComicSans-Bold': require('./assets/fonts/ComicSans/Comic-Sans-Bold.ttf'),
    'Garamond': require('./assets/fonts/Garamond/Garamond.ttf'),
    'OpenDyslexic': require('./assets/fonts/OpenDyslexic/OpenDyslexic-Regular.otf'),
    'OpenDyslexic-Bold': require('./assets/fonts/OpenDyslexic/OpenDyslexic-Bold.otf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home', headerTitle: () => <HeaderLogo />, headerStyle: { backgroundColor: Colours['main'].mid } }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Settings', headerStyle: { backgroundColor: Colours['main'].mid } }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Profile', headerStyle: { backgroundColor: Colours['main'].mid } }}
        />
        <Stack.Screen
          name="Summary"
          component={SummaryScreen}
          options={{ title: 'Summary', headerStyle: { backgroundColor: Colours['main'].mid } }}
        />
        <Stack.Screen
          name="TaskManager"
          component={TaskManager}
          options={{ title: 'Task Manager', headerStyle: { backgroundColor: Colours['main'].mid } }}
        />
        <Stack.Screen
          name="Question"
          component={Question}
          options={{ title: 'Question', headerStyle: { backgroundColor: Colours['main'].mid } }}
        />
        <Stack.Screen
          name="Adult"
          component={AdultScreen}
          options={{ title: 'Adult Area', headerStyle: { backgroundColor: Colours['main'].mid } }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
