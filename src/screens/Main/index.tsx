import React, { useContext, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import useGetList from '../../hooks/useGetList';
import { Screens } from '../screens';
import Pagination from '../../components/Pagination';
import { FilterContext } from '../../contexts/filter';
import Search from '../../components/Search';
import useSearch from '../../hooks/useSearch';
import Cryptocurrency from '../../components/Cryptocurrency';

const styles = StyleSheet.create({
  container: {
    margin: 16,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButton: {
    backgroundColor: 'grey',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  filterButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  filterButtonText: {
    color: 'white',
  },
  contentContainer: {
    flexGrow: 1,
  },
});

const Main: React.FC = () => {
  const { page, setPage } = useContext(FilterContext);
  const { data, loading, fetchData } = useGetList();
  const { navigate } = useNavigation();
  const { search, setSearch } = useSearch();

  useEffect(() => {
    fetchData();
  }, [fetchData, page]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterButtonWrapper}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => navigate(Screens.FilterModal as never)}>
          <Text style={styles.filterButtonText}>Open Filters</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.filterButtonWrapper}>
        <Search search={search} setSearch={setSearch} />
      </View>
      {!search && <Pagination page={page} setPage={setPage} />}
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          contentContainerStyle={styles.contentContainer}
          data={data}
          renderItem={item => (
            <Cryptocurrency navigate={navigate} item={item.item} />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Main;
