import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { normalizeEnumToArray } from '../../utils/normalizer';

interface SelectProps {
  object: any;
  defaultValue: string;
  label: string;
  onSelect: (value: string) => void;
}

const Select = ({ object, onSelect, defaultValue, label }: SelectProps) => {
  const normalizedItems = normalizeEnumToArray(object);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <RNPickerSelect
        value={defaultValue}
        onValueChange={value => onSelect(value)}
        items={normalizedItems}
        style={{ inputIOS: styles.inputIOS, inputAndroid: styles.inputAndroid }}
      />
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 3,
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 4,
    color: 'black',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderRadius: 8,
    color: 'black',
  },
});
