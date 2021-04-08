import React, { useState, useEffect, useContext } from 'react';
import {
  View, Text, Button, Modal, TextInput, StyleSheet, ImageBackground, Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import UnlockablesIndex from '../../assets/images/unlockables/UnlockablesIndex';
import ProfileAccolade from '../components/ProfileAccolade';
import UnlocksPicker from '../components/UnlocksPicker';
import IconButton from '../components/IconButton';
import { Colours, Spacing, Borders } from '../../styles/Index';
import { SettingsContext } from '../config/SettingsContext';

const defaultUnlocks = [...require('../../assets/images/unlockables/unlockedDefault.json')];

export default function ProfileScreen() {
  const [chosenBackground, setChosenBackground] = useState('sunny');
  const [chosenAvatar, setChosenAvatar] = useState('boy1');
  const [description, setDescription] = useState('Create a description for your profile!');
  const [tempDescription, setTempDescription] = useState();

  const [unlockedBackgrounds, setUnlockedBackgrounds] = useState([]);
  const [unlockedAvatars, setUnlockedAvatars] = useState([]);

  const [backgroundModal, setBackgroundModal] = useState(false);
  const [avatarModal, setAvatarModal] = useState(false);
  const [descriptionModal, setDescriptionModal] = useState(false);

  const [completedTasks, setCompletedTasks] = useState([]);

  const [settings] = useContext(SettingsContext);

  const unlockedListPath = `${FileSystem.documentDirectory}unlocks/unlockedList`;
  const tasksDir = `${FileSystem.documentDirectory}tasks`;

  useEffect(() => {
    update();
    loadTasks();
  }, []);

  const update = () => {
    loadPreferences();
    loadUnlocks();
  };

  const loadUnlocks = async () => {
    const unlocksExist = await FileSystem.getInfoAsync(unlockedListPath);
    let unlocks = null;

    if (unlocksExist.exists) {
      unlocks = JSON.parse(await FileSystem.readAsStringAsync(unlockedListPath));
    } else {
      unlocks = defaultUnlocks;
    }

    const backgrounds = [];
    const avatars = [];
    unlocks.map((unlock) => {
      if (UnlockablesIndex[unlock].type === 'background') {
        backgrounds.push(unlock);
      } else if (UnlockablesIndex[unlock].type === 'avatar') {
        avatars.push(unlock);
      }
      return null;
    });

    setUnlockedAvatars(avatars);
    setUnlockedBackgrounds(backgrounds);
  };

  const loadPreferences = async () => {
    const background = await AsyncStorage.getItem('background');
    const avatar = await AsyncStorage.getItem('avatar');
    const desc = await AsyncStorage.getItem('description');

    if (background) {
      setChosenBackground(background);
    }
    if (avatar) {
      setChosenAvatar(avatar);
    }
    if (desc) {
      setDescription(desc);
    }
  };

  const loadTasks = async () => {
    try {
      const tasksFolder = await FileSystem.readDirectoryAsync(tasksDir);
      const completed = await nameLater(tasksFolder);
      completed.sort((a, b) => (a.dateCompleted < b.dateCompleted ? 1 : -1));
      setCompletedTasks(completed);
    } catch {
      setCompletedTasks([]);
    }
  };

  const nameLater = async (tasksFolder) => {
    const filteredList = [];
    return new Promise((resolve) => {
      tasksFolder.map(async (taskName, i) => {
        let task = await FileSystem.readAsStringAsync(`${tasksDir}/${taskName}`);
        task = JSON.parse(task);

        if (task.completed) {
          filteredList.push(task);
        }
        if (i === tasksFolder.length - 1) {
          resolve(filteredList);
        }
      });
    });
  };

  const setAvatar = async (val) => {
    await AsyncStorage.setItem('avatar', val);
    update();
    setAvatarModal(false);
  };

  const setBackground = async (val) => {
    await AsyncStorage.setItem('background', val);
    update();
    setBackgroundModal(false);
  };

  const setDescriptionPref = async (val) => {
    await AsyncStorage.setItem('description', val);
    update();
    setDescriptionModal(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: Colours['main'].back }]}>
      <View style={styles.top}>
        <ImageBackground
          source={UnlockablesIndex[chosenBackground].uri}
          style={[styles.background, { borderBottomColor: Colours['main'].mid }]}
        >
          <View style={[styles.avatarzone, { backgroundColor: Colours['main'].mid }]}>
            <Image source={UnlockablesIndex[chosenAvatar].uri} style={styles.avatar} />
          </View>
          <View style={styles.accolade}>
            {completedTasks.length > 0 && <ProfileAccolade tasks={completedTasks} />}
          </View>
        </ImageBackground>
      </View>

      <View style={styles.bottom}>
        <View style={styles.left}>
          <Text style={[styles.description, { color: Colours['main'].altdark }]}>{description}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.button}>
            <IconButton icon="image" text="Choose Background" buttonAction={() => setBackgroundModal(true)} />
          </View>
          <View style={styles.button}>
            <IconButton icon="user" text="Choose Avatar" buttonAction={() => setAvatarModal(true)} />
          </View>
          <View style={styles.button}>
            <IconButton icon="edit" text="Change Description" buttonAction={() => setDescriptionModal(true)} />
          </View>
        </View>

      </View>

      <UnlocksPicker
        visible={backgroundModal}
        topMessage="Choose a background"
        unlocks={unlockedBackgrounds}
        preferenceFunction={setBackground}
        setVisible={setBackgroundModal}
      />

      <UnlocksPicker
        visible={avatarModal}
        topMessage="Choose an avatar"
        unlocks={unlockedAvatars}
        preferenceFunction={setAvatar}
        setVisible={setAvatarModal}
      />

      <Modal animationType="slide" visible={descriptionModal} transparent onRequestClose={() => setDescriptionModal(false)}>
        <View style={styles.outer}>
          <View style={[styles.modalcontent, { backgroundColor: Colours['main'].back }]}>
            <TextInput
              multiline
              maxLength={250}
              defaultValue={description}
              onSubmitEditing={(value) => setDescription(value)}
              onChangeText={(value) => setTempDescription(value)}
              style={[styles.textbox, { backgroundColor: Colours['main'].mid, color: Colours['main'].text }]}
            />
            <View style={styles.savebutton}>
              <IconButton icon="save" text="Save" buttonAction={() => setDescriptionPref(tempDescription)} />
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colours['main'].back,
  },
  top: {
    flex: 4,
  },
  background: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    // borderBottomColor: Colours['main'].mid,
    borderBottomWidth: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  avatarzone: {
    height: 300,
    width: 300,
    marginBottom: Spacing.margin.mid,
    borderRadius: 90,
    // backgroundColor: Colours['main'].mid,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    height: '95%',
    width: '95%',
    resizeMode: 'contain',
    borderRadius: Borders.radius.mid,
  },
  accolade: {
    position: 'absolute',
    bottom: 15,
    left: 15,
  },
  bottom: {
    flex: 2,
    flexDirection: 'row',
    padding: Spacing.padding.mid,
  },
  left: {
    flex: 7,
  },
  buttons: {
    flex: 2,
    justifyContent: 'space-around',
  },
  description: {
    fontSize: 32,
    padding: Spacing.padding.mid,
    // color: Colours['main'].altdark,
    lineHeight: 50,
  },
  outer: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalcontent: {
    width: '75%',
    height: 400,
    // backgroundColor: Colours['main'].back,
    borderRadius: Borders.radius.large,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.padding.large,
  },
  textbox: {
    flex: 3,
    fontSize: 28,
    // backgroundColor: Colours['main'].mid,
    borderRadius: Borders.radius.mid,
    padding: Spacing.padding.large,
    // color: Colours['main'].text,
    lineHeight: 40,
  },
  savebutton: {
    flex: 1,
    marginTop: Spacing.margin.large,
  },
});
