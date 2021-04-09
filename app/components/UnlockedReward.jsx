import React, { useContext } from 'react';
import {
  View, Text, Modal, Button, Image, StyleSheet,
} from 'react-native';
import UnlockablesIndex from '../../assets/images/unlockables/UnlockablesIndex';
import { Colours, Borders, Spacing } from '../../styles/Index';
import IconButton from './IconButton';
import { SettingsContext } from '../config/SettingsContext';

export default function Unlock({
  modalVisible, unlocked, navigation, setModalVisible,
}) {
  const [settings] = useContext(SettingsContext);

  const goProfile = () => {
    setModalVisible(false);
    navigation.navigate('Home');
    navigation.navigate('Profile');
  };

  const goHome = () => {
    setModalVisible(false);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={modalVisible}
        transparent
      >
        <View style={styles.outer}>
          <View style={[styles.modalcontent, { backgroundColor: Colours[settings.theme].back }]}>
            {unlocked && UnlockablesIndex[unlocked] && (
            <View style={styles.unlock}>
              <Text style={[styles.unlocktext, {
                color: Colours[settings.theme].altdark,
                fontSize: 32 * settings.fontSize,
                fontFamily: settings.fontFamily,
                letterSpacing: settings.fontSpacing,
              }]}
              >
                {`You unlocked a new ${UnlockablesIndex[unlocked].type}:`}
              </Text>
              <View style={styles.imagezone}>
                <Image
                  source={UnlockablesIndex[unlocked].uri}
                  style={styles.image}
                  fadeDuration={1000}
                />
              </View>
            </View>
            )}
            <View style={styles.buttons}>
              <View style={styles.button}>
                <IconButton icon="award" text="Go to Profile" buttonAction={goProfile} />
              </View>
              <View style={styles.button}>
                <IconButton icon="home" text="Go Home" buttonAction={goHome} />
              </View>
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
  },
  outer: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalcontent: {
    width: '75%',
    height: '75%',
    // backgroundColor: Colours['main'].back,
    borderRadius: Borders.radius.large,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.padding.mid,
  },
  unlock: {
    flex: 4,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  unlocktext: {
    flex: 1,
    textAlign: 'center',
    fontSize: 32,
    marginTop: Spacing.margin.mid,
    // color: Colours['main'].altdark,
  },
  imagezone: {
    flex: 6,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    borderRadius: Borders.radius.large,
    height: '100%',
    resizeMode: 'contain',
  },
  button: {
    margin: Spacing.margin.mid,
  },
});
