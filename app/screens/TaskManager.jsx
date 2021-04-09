import React, { useState, useEffect, useContext } from 'react';
import {
  View, Text, Alert, StyleSheet, FlatList, TouchableHighlight,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import shorthash from 'shorthash';
import { Validator } from 'jsonschema';
import { Feather } from '@expo/vector-icons';
import schema from '../../helpers/schema/TaskSchema';
import TaskWidgetEditable from '../components/TaskWidgetEditable';
import { Colours, Spacing } from '../../styles/Index';
import { SettingsContext } from '../config/SettingsContext';

export default function TaskManager() {
  const [taskList, setTaskList] = useState([]);
  const [settings] = useContext(SettingsContext);

  useEffect(() => {
    showDirectory();
  }, [taskList]);

  const importTask = async () => {
    const file = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
      type: 'application/json',
    });
    if (file.type !== 'success') {
      return;
    }
    const name = shorthash.unique(file.name);

    const taskDir = `${FileSystem.documentDirectory}tasks`;
    const dirExists = await FileSystem.getInfoAsync(taskDir);

    if (!dirExists.exists) {
      await FileSystem.makeDirectoryAsync(taskDir);
    }

    const tempDir = `${FileSystem.documentDirectory}temp`;
    const tempdirExists = await FileSystem.getInfoAsync(tempDir);

    if (!tempdirExists.exists) {
      await FileSystem.makeDirectoryAsync(tempDir);
    }

    // copy file to temp internal if doesn't already exist
    const filePath = `${taskDir}/${name}`;
    const tempPath = `${tempDir}/${name}`;
    const alreadyExists = await FileSystem.getInfoAsync(filePath);

    if (alreadyExists.exists) {
      Alert.alert(null, 'File already imported');
    } else {
      const options = { from: file.uri, to: tempPath };
      await FileSystem.copyAsync(options);

      // delete invalid file formats
      const validFile = await validateFile(tempPath);
      if (!validFile) {
        Alert.alert(null, 'Invalid file format');
        await FileSystem.deleteAsync(tempPath, { idempotent: true });
      } else {
        // move to actual location
        await FileSystem.deleteAsync(tempPath, { idempotent: true });
        const finalMove = { from: file.uri, to: filePath };
        await FileSystem.copyAsync(finalMove);
      }
    }
  };

  const validateFile = async (path) => {
    const v = new Validator();
    const file = await FileSystem.readAsStringAsync(path);
    const fileContents = JSON.parse(file);

    const isValid = v.validate(fileContents, schema).valid;

    return isValid;
  };

  const showDirectory = async () => {
    try {
      const contents = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}tasks`);
      setTaskList(contents);
    } catch {
      setTaskList([]);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: Colours[settings.theme].back }]}>
      <View style={styles.top}>
        <View style={[styles.button, { backgroundColor: Colours[settings.theme].mid }]}>
          <TouchableHighlight onPress={importTask} underlayColor="white">
            <View style={styles.buttonInner}>
              <Feather name="folder" size={40} color={Colours[settings.theme].altdark} />
              <Text style={[styles.buttonText, { color: Colours[settings.theme].altdark }]}>
                Select Tasks to Import
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>

      <View style={styles.bottom}>
        <Text style={[styles.header, { color: Colours[settings.theme].altdark }]}>
          Imported Tasks
        </Text>
        {taskList.length > 0
          ? (
            <FlatList
              data={[...taskList]}
              renderItem={({ item }) => (
                <View style={styles.task}>
                  <TaskWidgetEditable fileName={item} key={item} />
                </View>
              )}
              keyExtractor={(item) => item.title}
            />
          )
          : <Text>Start importing tasks to see something here!</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colours[main].back,
    flex: 1,
    padding: 15,
  },
  top: {
    justifyContent: 'center',
  },
  bottom: {
    marginTop: Spacing.margin.large,
    flex: 1,
  },
  task: {
    marginBottom: 15,
  },
  header: {
    // color: Colours['main'].altdark,
    fontSize: 32,
    marginBottom: 25,
    textAlign: 'center',
  },
  button: {
    // backgroundColor: Colours[main].mid,
    alignSelf: 'center',
    padding: Spacing.padding.mid,
    borderRadius: 15,
  },
  buttonInner: {
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 28,
    marginLeft: Spacing.margin.mid,
  },
});
