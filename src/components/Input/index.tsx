import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface InputProps {
  value: any;
  label: string;
  onChange: (value: string) => void;
}

const Input = ({ onChange, value, label }: InputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        defaultValue={value}
        onChangeText={e => onChange(e)}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  label: {
    marginBottom: 3,
  },
  container: {
    marginBottom: 10,
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 3,
  },
});
