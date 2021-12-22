import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
  cryptoItemIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});
const Cryptocurrency = ({ item, navigate, currency }: any) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigate(Screens.CryptoDetailModal, {
          cryptocurrencyId: item.id,
        })
      }
      style={styles.cryptoItem}>
      <View style={styles.cryptoItem}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.cryptoItemIcon} />
        ) : null}
        <View>
          <Text>{item.name}</Text>
          {item.current_price ? (
            <Text>
              {item.current_price} {currency}
            </Text>
          ) : null}
        </View>
      </View>
      <Text style={styles.cryptoItemArrow}>{'>'}</Text>
    </TouchableOpacity>
  );
};
export default Cryptocurrency;
