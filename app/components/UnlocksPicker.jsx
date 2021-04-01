import React from 'react';
import {
  View, Text, Modal, Button,
} from 'react-native';
import UnlockablesIndex from '../../assets/images/unlockables/UnlockablesIndex';
import Reward from './Reward';

export default function RewardPicker({
  topMessage, visible, unlocks, preferenceFunction, setVisible,
}) {
  return (
    <View>
      <Modal
        visible={visible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setVisible(false)}
      >
        <Text>{topMessage}</Text>
        <Button title="Close" onPress={() => setVisible(false)} />
        {unlocks.map((unlock) => (
          <Reward
            key={unlock}
            uri={UnlockablesIndex[unlock].uri}
            reward={unlock}
            setPreference={preferenceFunction}
          />

        ))}
      </Modal>
    </View>
  );
}
