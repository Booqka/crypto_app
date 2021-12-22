import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Screens } from '../../enums/screens';
import React from 'react';

const styles = StyleSheet.create({
  cryptoItem: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cryptoItemArrow: {
    marginRight: 10,
  },
});
const Cryptocurrency = ({ item, navigate }: any) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigate(Screens.CryptoDetailModal, {
          cryptocurrencyId: item.id,
        })
      }
      style={styles.cryptoItem}>
      <Text>{item.name}</Text>
      <Text style={styles.cryptoItemArrow}>{'>'}</Text>
    </TouchableOpacity>
  );
};
export default Cryptocurrency;
