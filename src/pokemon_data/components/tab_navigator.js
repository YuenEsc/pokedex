import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AboutScreen from '../screens/about_screen';
import BaseStatsScreen from '../screens/base_stats_screen';
import EvolutionScreen from '../screens/evolution_screen';
import MovesScreen from '../screens/moves_screen';

const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => {
  return (
    <React.Fragment>
      <Tab.Navigator
        initialRouteName="About"
        tabBarOptions={{
          style: {
            elevation: 0,
            color: '#fff',
          },
          indicatorStyle: {
            width: '11%',
            marginLeft: '5%',
            height: 3,
            borderRadius: 2,
          },
          labelStyle: {
            fontWeight: 'bold',
            fontSize: 12,
          },
          lazy: true,
        }}>
        <Tab.Screen name="About" component={AboutScreen} />
        <Tab.Screen name="Moves" component={MovesScreen} />
        <Tab.Screen name="Base stats" component={BaseStatsScreen} />
        <Tab.Screen name="Evolution" component={EvolutionScreen} />
      </Tab.Navigator>
    </React.Fragment>
  );
};

export default TabNavigator;
