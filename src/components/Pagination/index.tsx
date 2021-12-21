import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PaginationProps {
  page: number;
  setPage: (value: number) => void;
}

const Pagination = ({ page, setPage }: PaginationProps) => {
  const pages =
    page < 4
      ? [1, 2, 3, 4, 5, 6, 7]
      : [1, page - 2, page - 1, page, page + 1, page + 2, page + 3];
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
      }}>
      {pages.map(current => {
        const isActive = current === page;
        return (
          <TouchableOpacity
            key={current}
            onPress={() => setPage(current)}
            style={[styles.page, isActive && styles.active]}>
            <Text style={{ color: isActive ? 'black' : 'white' }}>
              {current}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    borderRadius: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'grey',
  },
  active: {
    backgroundColor: 'white',
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 3,
  },
});
