import React from 'react';
import { Image } from 'react-native';

export default function LogoHeader() {
  return (
    <Image
      source={require('../images/logo_s_fundo_s_nome.png')}
      style={{ width: 120, height: 40, resizeMode: 'contain' }}
    />
  );
}