import React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';

import useCoinData from '../../hooks/useCoinData';
import { Screens } from '../../enums/screens';
import { RootStackParamList } from '../../../App';

type ProfileScreenRouteProp = RouteProp<
  RootStackParamList,
  Screens.CryptoDetailModal
>;

const styles = StyleSheet.create({
  container: {
    margin: 16,
    flex: 1,
  },
  closeButton: {
    backgroundColor: 'grey',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 50,
  },
  closeButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  closeButtonText: {
    color: 'white',
  },
});

const CryptoDetailModal = () => {
  const { goBack } = useNavigation();
  const { params } = useRoute<ProfileScreenRouteProp>();
  const { coin, loading } = useCoinData(params?.cryptocurrencyId);

  if (loading || !coin) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <ActivityIndicator size="large" />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Object.keys(coin)
        .filter(key => coin[key])
        .map(key => {
          switch (key) {
            case 'image':
            case 'public_interest_stats':
            case 'platforms':
            case 'localization':
            case 'description':
            case 'links':
            case 'ico_data':
            case 'categories':
              return null;
            case 'roi':
              return (
                <Image
                  source={{ uri: coin[key] }}
                  width={32}
                  height={32}
                  resizeMode="contain"
                  style={{ height: 32, width: 32, marginRight: 16 }}
                />
              );
            default:
              const value = key.includes('date')
                ? moment(`${coin[key]}`).format('lll')
                : coin[key];
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                    borderBottomWidth: 1,
                    paddingBottom: 2,
                    borderColor: '#CECECE',
                  }}>
                  <Text
                    style={{
                      flex: 1,
                    }}>
                    {key.split('_').join(' ')}:
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      textAlign: 'right',
                    }}>
                    {value}
                  </Text>
                </View>
              );
          }
        })}

      <View style={styles.closeButtonWrapper}>
        <TouchableOpacity style={styles.closeButton} onPress={goBack}>
          <Text style={styles.closeButtonText}>Close Filters</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CryptoDetailModal;
