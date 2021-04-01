import React from 'react';
import {
  View, Text, Modal, Button, Image,
} from 'react-native';
import UnlockablesIndex from '../../assets/images/unlockables/UnlockablesIndex';

export default function Unlock({
  modalVisible, unlocked, navigation, setModalVisible,
}) {
  return (
    <View>
      <Modal
        visible={modalVisible}
      >
        {unlocked && UnlockablesIndex[unlocked] && (
          <>
            <Text>
              You unlocked a new
              {' '}
              {UnlockablesIndex[unlocked].type}
              :
            </Text>
            <Image
              source={UnlockablesIndex[unlocked].uri}
              style={{ width: 200, height: 200 }}
              fadeDuration={1000}
            />
          </>
        )}

        <Button
          title="Go to Profile"
          onPress={() => {
            setModalVisible(false);
            navigation.navigate('Home');
            navigation.navigate('Profile');
          }}
        />
        <Button
          title="Go Home"
          onPress={() => {
            setModalVisible(false);
            navigation.navigate('Home');
          }}
        />
      </Modal>
    </View>
  );
}
