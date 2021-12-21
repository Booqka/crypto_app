import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface IProps {
  search: string;
  setSearch: (arg?: string) => void;
}

const Search: React.FC<IProps> = ({ search, setSearch }) => {
  const ref = useRef<any>(undefined);

  return (
    <View style={styles.container}>
      <TextInput
        ref={ref}
        style={styles.input}
        defaultValue={search}
        onChangeText={setSearch}
      />
      {search ? (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => {
            ref.current.blur();
            setSearch(undefined);
          }}>
          <Text style={styles.clearButtonText}>X</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  label: {
    marginBottom: 3,
  },
  clearButton: {
    borderWidth: 1,
    width: 18,
    height: 18,
    paddingLeft: 1,
    borderRadius: 20,
    position: 'absolute',
    right: 10,
    top: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#5a5a5a',
  },
  clearButtonText: {
    color: '#5a5a5a',
  },
  container: {
    marginBottom: 10,
    width: '100%',
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#CECECE',
    borderRadius: 3,
  },
});
