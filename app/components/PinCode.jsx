import React, { useState, useEffect } from 'react';

import { View, Text, Button } from 'react-native';

export default function PinCode({ onSubmit }) {
  const [pincode, setPincode] = useState([null, null, null, null]);
  const [pointer, setPointer] = useState(0);

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
    // console.log(copy);
    setPincode(copy);
    console.log(pincode);
    setPointer(pointer + 1);
  };

  const deleteDigit = () => {
    const copy = [...pincode];
    copy[pointer] = null;
    setPincode(copy);
    if (pointer !== 0) {
      setPointer(pointer - 1);
    }
  };

  return (
    <View>
      {pincode && (
      <>
        <Text>{pincode[0] ? '*' : '-'}</Text>
        <Text>{pincode[1] ? '*' : '-'}</Text>
        <Text>{pincode[2] ? '*' : '-'}</Text>
        <Text>{pincode[3] ? '*' : '-'}</Text>
      </>
      )}

      {/* {(pointer + 1).map((val) => <Text key={val}>*</Text>)}
      {(3 - pointer).map((val) => <Text key={val}>*</Text>)} */}
      <Button title="9" onPress={() => addDigit(9)} />
      <Button title="8" onPress={() => addDigit(8)} />
      <Button title="7" onPress={() => addDigit(7)} />
      <Button title="6" onPress={() => addDigit(6)} />
      <Button title="5" onPress={() => addDigit(5)} />
      <Button title="4" onPress={() => addDigit(4)} />
      <Button title="3" onPress={() => addDigit(3)} />
      <Button title="2" onPress={() => addDigit(2)} />
      <Button title="1" onPress={() => addDigit(1)} />
      <Button title="0" onPress={() => addDigit(0)} />
      <Button title="Del" onPress={() => deleteDigit()} />
      <Button title="test" onPress={() => console.log(pincode)} />
    </View>
  );
}
