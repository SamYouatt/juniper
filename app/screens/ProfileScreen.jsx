import React, { useState, useEffect } from 'react';
import {
  View, Text, Button, Modal, TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import UnlockablesIndex from '../../assets/images/unlockables/UnlockablesIndex';
import Reward from '../components/Reward';

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

  const unlockedListPath = `${FileSystem.documentDirectory}unlocks/unlockedList`;

  useEffect(() => {
    update();
  }, []);

  const update = () => {
    loadPreferences();
    loadUnlocks();
  };

  const loadUnlocks = async () => {
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
    <View>
      <Text>{chosenBackground}</Text>
      <Text>{chosenAvatar}</Text>
      <Text>{description}</Text>

      <Button title="Choose background" onPress={() => setBackgroundModal(true)} />
      <Button title="Choose avatar" onPress={() => setAvatarModal(true)} />
      <Button title="Change Decsription" onPress={() => setDescriptionModal(true)} />

      <Modal animationType="slide" visible={backgroundModal} transparent={false} onRequestClose={() => setBackgroundModal(false)}>
        <Text>Background chooser</Text>
        {unlockedBackgrounds.map((unlock) => (
          <Reward
            key={unlock}
            uri={UnlockablesIndex[unlock].uri}
            reward={unlock}
            setPreference={setBackground}
          />
        ))}
      </Modal>

      <Modal animationType="slide" visible={avatarModal} transparent={false} onRequestClose={() => setAvatarModal(false)}>
        <Text>Avatar chooser</Text>
        {unlockedAvatars.map((unlock) => (
          <Reward
            key={unlock}
            uri={UnlockablesIndex[unlock].uri}
            reward={unlock}
            setPreference={setAvatar}
          />
        ))}
      </Modal>

      <Modal animationType="slide" visible={descriptionModal} transparent={false} onRequestClose={() => setDescriptionModal(false)}>
        <Text>Description editor</Text>
        <TextInput
          multiline={false}
          maxLength={250}
          defaultValue={description}
          onSubmitEditing={(value) => setDescription(value)}
          onChangeText={(value) => setTempDescription(value)}
        />
        <Button title="Submit" onPress={() => setDescriptionPref(tempDescription)} />
      </Modal>
    </View>
  );
}
