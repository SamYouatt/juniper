import React, { useContext } from 'react';
import {
  View, Text, Modal, Button, ScrollView, StyleSheet,
} from 'react-native';
import UnlockablesIndex from '../../assets/images/unlockables/UnlockablesIndex';
import Reward from './Reward';
import { Colours, Spacing, Borders } from '../../styles/Index';
import IconButton from './IconButton';
import { SettingsContext } from '../config/SettingsContext';

export default function RewardPicker({
  topMessage, visible, unlocks, preferenceFunction, setVisible,
}) {
  const [settings] = useContext(SettingsContext);

  return (
    <View>
      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.outer}>
          <View style={[styles.modalcontent, { backgroundColor: Colours[settings.theme].back }]}>
            <View style={styles.header}>
              <Text style={[styles.headertext, {
                color: Colours[settings.theme].altdark,
                fontSize: 28 * settings.fontSize,
                fontFamily: `${settings.fontFamily}-bold`,
                letterSpacing: settings.fontSpacing,
              }]}
              >
                {topMessage}
              </Text>
            </View>
            <View style={[styles.contents, { backgroundColor: Colours[settings.theme].mid }]}>
              <ScrollView contentContainerStyle={styles.scroll} persistentScrollbar>
                {unlocks.map((unlock) => (
                  <View style={styles.image}>
                    <Reward
                      key={unlock}
                      uri={UnlockablesIndex[unlock].uri}
                      reward={unlock}
                      setPreference={preferenceFunction}
                    />
                  </View>
                ))}
              </ScrollView>
            </View>
            <View style={styles.button}>
              <IconButton icon="arrow-left" text="Back" buttonAction={() => setVisible(false)} />
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
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.margin.mid,
  },
  headertext: {
    // fontSize: 28,
    textAlignVertical: 'center',
    // color: Colours['main'].altdark,
    // fontWeight: 'bold',
  },
  contents: {
    flex: 7,
    width: '80%',
    marginBottom: Spacing.margin.mid,
    // backgroundColor: Colours['main'].mid,
    padding: Spacing.padding.mid,
    borderRadius: Borders.radius.mid,
  },
  scroll: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  image: {
    marginBottom: Spacing.margin.large,
  },
  button: {
    flex: 1,
  },
});
