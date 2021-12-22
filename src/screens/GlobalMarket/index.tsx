import React, { useEffect } from 'react';
import {
  Text,
  SafeAreaView,
  ActivityIndicator,
  View,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import useGlobalData from '../../hooks/useGlobalData';
import { TabView, SceneMap } from 'react-native-tab-view';
import moment from 'moment';

interface MarketValues {
  data?: [string, number][];
}

interface MarketValueProps {
  item: [string, number];
}

const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#CECECE',
  },
  tabBar: {
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  symbol: {
    width: 100,
  },
  contentContainer: {
    flexGrow: 1,
    marginHorizontal: 12,
  },
  header: {
    fontSize: 14,
    fontWeight: '700',
    marginHorizontal: 12,
  },
});

const MarketValue = ({ item }: MarketValueProps) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.symbol}>Symbol: {item[0]}</Text>
      <Text style={styles.full}>marketValue: {item[1]}</Text>
    </View>
  );
};

const MarketList = ({ data }: MarketValues) => (
  <FlatList
    contentContainerStyle={styles.contentContainer}
    data={data}
    renderItem={({ item }) => <MarketValue item={item} />}
  />
);

const TabBar = (props: any) => {
  const inputRange = props.navigationState.routes.map(
    (x: string, i: number) => i,
  );

  return (
    <View style={styles.tabBar}>
      {props.navigationState.routes.map((route: any, i: number) => {
        const opacity = props.position.interpolate({
          inputRange,
          outputRange: inputRange.map((inputIndex: number) =>
            inputIndex === i ? 1 : 0.5,
          ),
        });

        return (
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => props.setIndex(i)}>
            <Animated.Text style={{ opacity }}>{route?.title}</Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const GlobalMarket = () => {
  const { loading = true, data, fetchData } = useGlobalData();
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Market volume' },
    { key: 'second', title: 'Market cap' },
  ]);

  const totalVolume =
    data?.total_volume &&
    Object.entries(data.total_volume).sort(
      ([, value1]: any, [, value2]: any) => {
        return value2 - value1;
      },
    );
  const totalMarketCap =
    data?.total_volume &&
    Object.entries(data.total_market_cap).sort(
      ([, value1]: any, [, value2]: any) => {
        return value2 - value1;
      },
    );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderScene = SceneMap({
    first: () => <MarketList data={totalVolume} />,
    second: () => <MarketList data={totalMarketCap} />,
  });

  if (loading) {
    return (
      <SafeAreaView>
        <View style={styles.full}>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.full}>
      <Text style={styles.header}>
        Updated at: {moment(data?.updatedAt).format('lll')}
      </Text>
      <TabView
        navigationState={{ index, routes }}
        style={{
          backgroundColor: 'transparent',
        }}
        renderTabBar={props => <TabBar {...props} setIndex={setIndex} />}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </SafeAreaView>
  );
};

export default GlobalMarket;
