import React from 'react';
import {
  Text,
  SafeAreaView,
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import useTrending from '../../hooks/useTrending';

const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#CECECE',
  },
  contentContainer: {
    flexGrow: 1,
    marginHorizontal: 12,
  },
  header: {
    fontSize: 14,
    fontWeight: '700',
    marginHorizontal: 12,
    marginBottom: 10,
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
});

const MarketValue = ({ item: { item } }: any) => {
  return (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: item.small }}
        width={20}
        height={20}
        style={styles.image}
      />
      <View>
        <Text>Name: {item.name}</Text>
        <Text>Market cap rank: {item.market_cap_rank}</Text>
      </View>
    </View>
  );
};

const Trending = () => {
  const { coins, loading } = useTrending();

  if (loading || !coins) {
    return (
      <SafeAreaView>
        <View style={styles.full}>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }
  const sortedCoins = coins.sort(
    (a, b) => b.item.market_cap_rank - a.item.market_cap_rank,
  );

  return (
    <SafeAreaView style={styles.full}>
      <Text style={styles.header}>Trending</Text>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={sortedCoins}
        renderItem={({ item }) => <MarketValue item={item} />}
      />
    </SafeAreaView>
  );
};

export default Trending;
