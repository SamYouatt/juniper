import React from 'react';
import { Image } from 'react-native';

export default function HeaderLogo() {
  return (
    <Image source={require('../../assets/logo-text-big.png')} style={{ height: 50, width: 275 }} />
  );
}
