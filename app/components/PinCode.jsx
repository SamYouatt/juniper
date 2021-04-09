import React, { useState, useEffect, useContext } from 'react';

import {
  View, Text, StyleSheet,
} from 'react-native';
import { Colours, Spacing, Borders } from '../../styles/Index';
import IconButton from './IconButton';
import PinButton from './PinButton';
import { SettingsContext } from '../config/SettingsContext';

export default function PinCode({ onSubmit, dismissAction }) {
  const [pincode, setPincode] = useState([null, null, null, null]);
  const [pointer, setPointer] = useState(0);
  const [settings] = useContext(SettingsContext);

  useEffect(() => {
    if (pointer === 4) {
      onSubmit(pincode.join(''));
      setPointer(0);
      setPincode([null, null, null, null]);
    }
  }, [pincode]);

  const addDigit = (digit) => {
    const copy = [...pincode];
    copy[pointer] = digit;
    setPincode(copy);
    setPointer(pointer + 1);
  };

  const deleteDigit = () => {
    const copy = [...pincode];
    copy[pointer - 1] = null;
    setPincode(copy);
    if (pointer !== 0) {
      setPointer(pointer - 1);
    }
  };

  const clearDigits = () => {
    setPincode([null, null, null, null]);
    setPointer(0);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.digitszone, { backgroundColor: Colours[settings.theme].altlight }]}>
        {pincode && (
        <View style={styles.digits}>
          <Text style={styles.digiticon}>{pincode[0] ? '*' : '-'}</Text>
          <Text style={styles.digiticon}>{pincode[1] ? '*' : '-'}</Text>
          <Text style={styles.digiticon}>{pincode[2] ? '*' : '-'}</Text>
          <Text style={styles.digiticon}>{pincode[3] ? '*' : '-'}</Text>
        </View>
        )}
      </View>
      <View style={styles.buttons}>
        <View style={styles.row}>
          <PinButton text="9" buttonAction={() => addDigit(9)} style={styles.button} />
          <PinButton text="8" buttonAction={() => addDigit(8)} />
          <PinButton text="7" buttonAction={() => addDigit(7)} />
        </View>
        <View style={styles.row}>
          <PinButton text="6" buttonAction={() => addDigit(6)} />
          <PinButton text="5" buttonAction={() => addDigit(5)} />
          <PinButton text="4" buttonAction={() => addDigit(4)} />
        </View>
        <View style={styles.row}>
          <PinButton text="3" buttonAction={() => addDigit(3)} />
          <PinButton text="2" buttonAction={() => addDigit(2)} />
          <PinButton text="1" buttonAction={() => addDigit(1)} />
        </View>
        <View style={styles.row}>
          <PinButton text="Clr" buttonAction={clearDigits} />
          <PinButton text="0" buttonAction={() => addDigit(0)} />
          <PinButton text="Del" buttonAction={deleteDigit} />
        </View>

      </View>
      <View style={styles.bottom}>
        <IconButton icon="x" text="Dismiss" buttonAction={dismissAction} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  digitszone: {
    // backgroundColor: Colours['main'].altlight,
    borderRadius: Borders.radius.mid,
    justifyContent: 'center',
    flex: 1,
    marginBottom: Spacing.margin.large,
  },
  digits: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  digiticon: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: Spacing.margin.mid,
    justifyContent: 'space-evenly',
  },
  buttons: {
    flex: 5,
    justifyContent: 'space-around',
  },
  button: {
    marginRight: 25,
  },
  bottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
