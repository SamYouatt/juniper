import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet, Text, View, Modal, Alert, FlatList,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskWidget from '../components/TaskWidget';
import PinCode from '../components/PinCode';
import { SettingsContext } from '../config/SettingsContext';
import { Colours, Spacing, Borders } from '../../styles/Index';
import IconButton from '../components/IconButton';

export default function HomeScreen({ navigation }) {
  const [scheduledTasks, setScheduledTasks] = useState([]);
  const [unscheduledTasks, setUnscheduledTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const focus = useIsFocused();
  const [settings] = useContext(SettingsContext);

  useEffect(() => {
    if (focus) {
      refresh();
    }
  }, [focus]);

  const refresh = () => {
    setUnscheduledTasks([]);
    setScheduledTasks([]);
    loadTasks();
  };

  const loadTasks = async () => {
    const allTasks = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}tasks`);

    const unscheduled = [];
    const scheduled = [];

    allTasks.map(async (taskName) => {
      const task = JSON.parse(await FileSystem.readAsStringAsync(`${FileSystem.documentDirectory}tasks/${taskName}`));

      if (!task.completed) {
        const asObject = { task, taskName };
        if (task.scheduled) {
          scheduled.push(asObject);
        } else {
          unscheduled.push(asObject);
        }
      }

      scheduled.sort((a, b) => (a.task.scheduled < b.task.scheduled ? -1 : 1));

      setScheduledTasks([...scheduled]);
      setUnscheduledTasks([...unscheduled]);
    });
  };

  const pinCheck = async (pin) => {
    const actualPin = await getPin();
    console.log(`actual Pin: ${actualPin}`);
    if (pin === actualPin) {
      setModalVisible(false);

      navigation.navigate('Adult');
    } else {
      Alert.alert(null, 'Incorrect pin try again');
    }
  };

  const enterAdultArea = async () => {
    if (await getPin()) {
      setModalVisible(true);
    } else {
      Alert.alert(null, 'Consider setting a pin up');
      navigation.navigate('Adult');
    }
  };

  const getPin = async () => {
    try {
      const value = await AsyncStorage.getItem('pin');
      if (value !== null) {
        return value;
      }
      return null;
    } catch (e) {
      return null;
    }
  };

  const scheduleTask = async (fileName, task, date) => {
    task.scheduled = date;
    const asString = JSON.stringify(task);
    await FileSystem.writeAsStringAsync(`${FileSystem.documentDirectory}tasks/${fileName}`, asString);
    refresh();
  };

  return (
    <View style={[styles.container, { backgroundColor: Colours[settings.theme].back }]}>
      {scheduledTasks.length > 0 && (
      <View style={styles.top}>
        <Text style={[styles.textheader, {
          color: Colours[settings.theme].altdark,
          fontSize: 32 * settings.fontSize,
          fontFamily: settings.fontFamily,
          letterSpacing: settings.fontSpacing,
        }]}
        >
          Scheduled Tasks
        </Text>
        <FlatList
          data={[...scheduledTasks]}
          renderItem={({ item }) => (
            <View style={styles.task} key={`view${item.taskName}`}>
              <TaskWidget
                fileName={item.taskName}
                key={item.taskName}
                task={item.task}
                navigation={navigation}
              />
            </View>
          )}
          keyExtractor={(item) => `list${item.task.name}`}
        />
      </View>
      )}

      {unscheduledTasks.length > 0 && (
      <View style={styles.bottom}>
        <Text style={[styles.textheader, {
          color: Colours[settings.theme].altdark,
          fontSize: 32 * settings.fontSize,
          fontFamily: settings.fontFamily,
          letterSpacing: settings.fontSpacing,
        }]}
        >
          Unscheduled Tasks
        </Text>
        <FlatList
          data={[...unscheduledTasks]}
          renderItem={({ item }) => (
            <View style={styles.task} key={`view${item.taskName}`}>
              <TaskWidget
                fileName={item.taskName}
                key={item.taskName}
                task={item.task}
                navigation={navigation}
                scheduleTask={scheduleTask}
              />
            </View>
          )}
          keyExtractor={(item) => `list${item.task.name}`}
        />
      </View>
      )}

      <View style={styles.profile}>
        <IconButton icon="award" text="Profile" buttonAction={() => navigation.navigate('Profile')} />
      </View>

      <View style={styles.adultarea}>
        <IconButton icon="settings" text="Adult Area" buttonAction={enterAdultArea} />
      </View>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.outer}>
          <View style={[styles.modalcontent, { backgroundColor: Colours[settings.theme].back }]}>
            <PinCode onSubmit={pinCheck} dismissAction={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    // backgroundColor: Colours[settings.theme].back,
    padding: Spacing.padding.mid,
    paddingLeft: Spacing.padding.large,
  },
  top: {
    flex: 1,
    alignItems: 'center',
  },
  bottom: {
    flex: 1,
    alignItems: 'center',
    marginTop: Spacing.margin.mid,
  },
  adultarea: {
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
  profile: {
    position: 'absolute',
    top: 25,
    right: 25,
  },
  textheader: {
    // fontSize: 32,
    marginBottom: 25,
    // color: Colours[settings.theme].altdark,
  },
  task: {
    marginBottom: 15,
    width: 1000,
  },
  outer: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalcontent: {
    width: '25%',
    height: '70%',
    // backgroundColor: Colours['main'].back,
    borderRadius: Borders.radius.large,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.padding.mid,
  },
});
