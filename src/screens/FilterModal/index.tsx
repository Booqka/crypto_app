import React, { useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Select from '../../components/Select';
import { Currency, Order } from '../../enums/enums';
import Input from '../../components/Input';
import { FilterContext } from '../../contexts/filter';

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  closeButton: {
    backgroundColor: 'grey',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
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
const FilterModal = () => {
  const { goBack } = useNavigation();
  const { currency, order, perPage, setPerPage, setCurrency, setOrder } =
    useContext(FilterContext);

  return (
    <SafeAreaView style={styles.container}>
      <Select
        label={'Order'}
        object={Order}
        defaultValue={order}
        onSelect={setOrder}
      />
      <Select
        label={'Currency'}
        object={Currency}
        defaultValue={currency}
        onSelect={setCurrency}
      />
      <Input
        label="Per Page"
        value={perPage.toString()}
        onChange={e => {
          setPerPage(Number(e));
        }}
      />
      <View style={styles.closeButtonWrapper}>
        <TouchableOpacity style={styles.closeButton} onPress={goBack}>
          <Text style={styles.closeButtonText}>Close Filters</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FilterModal;
