import React, { useState, useEffect } from 'react';
import {
  View, Text, Button, Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import UnlockablesIndex from '../../assets/images/unlockables/UnlockablesIndex';

const defaultUnlocks = [...require('../../assets/images/unlockables/unlockedDefault.json')];

export default function ProfileScreen() {
  const [chosenBackground, setChosenBackground] = useState('sunny');
  const [chosenAvatar, setChosenAvatar] = useState('boy1');
  const [unlockedBackgrounds, setUnlockedBackgrounds] = useState([]);
  const [unlockedAvatars, setUnlockedAvatars] = useState([]);
  const [backgroundModal, setBackgroundModal] = useState(false);
  const [avatarModal, setAvatarModal] = useState(false);

  const unlockedListPath = `${FileSystem.documentDirectory}unlocks/unlockedList`;

  useEffect(() => {
    loadPreferences();
    loadUnlocks();
  }, []);

  const loadPreferences = async () => {
    const background = await AsyncStorage.getItem('background');
    const avatar = await AsyncStorage.getItem('avatar');

    if (background) {
      setChosenBackground(background);
    }
    if (avatar) {
      setChosenAvatar(avatar);
    }
  };

  const setPreference = async (key, val) => {
    await AsyncStorage.setItem(key, val);
  };

  const loadUnlocks = async () => {
    //
    const unlocksExist = await FileSystem.getInfoAsync(unlockedListPath);
    if (unlocksExist.exists) {
      const unlocks = JSON.parse(await FileSystem.readAsStringAsync(unlockedListPath));
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
    }
  };

  return (
    <View>
      <Text>Profile</Text>
      <Text>{chosenBackground}</Text>
      <Text>{chosenAvatar}</Text>

      <Button title="Choose background" onPress={() => setBackgroundModal(true)} />
      <Button title="Choose avatar" onPress={() => setAvatarModal(true)} />

      <Modal animationType="slide" visible={backgroundModal} transparent={false} onRequestClose={() => setBackgroundModal(false)}>
        <Text>Background chooser</Text>
      </Modal>

      <Modal animationType="slide" visible={avatarModal} transparent={false} onRequestClose={() => setAvatarModal(false)}>
        <Text>Avatar chooser</Text>
      </Modal>

      <Button title="Test" onPress={loadUnlocks} />
      <Button title="Test2" onPress={() => console.log(unlockedAvatars)} />

    </View>
  );
}
