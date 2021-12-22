import React, { useEffect } from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Screens } from '../enums/screens';
import Main from './Main';
import Trending from './Trending';
import GlobalMarket from './GlobalMarket';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  tab: {
    padding: 5,
    flex: 1,
    alignItems: 'center',
  },
  active: {
    color: 'rgb(26,123,253)',
  },
});

const BottomTab = createBottomTabNavigator();
interface IProps extends BottomTabBarProps {}

const TabBar: React.FC<IProps> = ({ state, navigation }) => {
  const insets = useSafeAreaInsets();

  const renderTab = (route, index) => {
    return (
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate(route.name)}
        key={route.key}>
        <Text style={index === state.index && styles.active}>
          {route.name.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        marginBottom: insets.bottom,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      {state.routes.map(renderTab)}
    </View>
  );
};

const TabStack = () => {
  const { navigate } = useNavigation();
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        navigate(Screens.Network as never);
      }
    });

    unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BottomTab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <TabBar {...props} />}
      initialRouteName={Screens.Home}>
      <BottomTab.Screen name={Screens.Home} component={Main} />
      <BottomTab.Screen name={Screens.Trending} component={Trending} />
      <BottomTab.Screen name={Screens.GlobalMarket} component={GlobalMarket} />
    </BottomTab.Navigator>
  );
};

export default TabStack;
