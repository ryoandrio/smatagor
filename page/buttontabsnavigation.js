import * as React from 'react';
import {Text, TouchableOpacity, View, Linking, ScrollView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {WebView} from 'react-native-webview';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DataSchools from './smakotabogor.json';
// import {ScrollView} from 'react-native-gesture-handler';

function PointScreen() {
  return (
    <View style={{width: '100%', height: '100%'}}>
      <WebView
        source={{
          uri: 'https://ryoandrio.github.io/pgpbl-acara10/point.html',
        }}
      />
    </View>
  );
}

function LineScreen() {
  return (
    <View style={{width: '100%', height: '100%'}}>
      <WebView
        source={{
          uri: 'https://ryoandrio.github.io/pgpbl-acara10/line.html',
        }}
      />
    </View>
  );
}

function PolygonScreen() {
  return (
    <View style={{width: '100%', height: '100%'}}>
      <WebView
        source={{
          uri: 'https://ryoandrio.github.io/pgpbl-acara10/polygon.html',
        }}
      />
    </View>
  );
}

function SchoolsParse() {
  return DataSchools.map(item => (
    <TouchableOpacity
      onPress={() =>
        Linking.openURL(
          'google.navigation:q=' + item.latitude + ',' + item.longitude,
        )
      }>
      <View
        style={{
          backgroundColor: item.status == 'Negeri' ? 'lightskyblue' : 'pink',
          margin: 5,
          padding: 10,
        }}>
        <FontAwesome5
          name={item.status == 'Negeri' ? 'school' : 'chalkboard-teacher'}
          size={40}
        />
        <Text style={{fontWeight: 'bold', fontSize: 20}}>{item.nama}</Text>
        <Text>{item.status}</Text>
        <Text>
          {item.alamat}, {item.desa}, {item.kecamatan}
        </Text>
      </View>
    </TouchableOpacity>
  ));
}

function SchoolsScreen() {
  return (
    <ScrollView>
      <View style={{width: '100%', height: '100%'}}>
        <SchoolsParse />
      </View>
    </ScrollView>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            // FontAwesome5
            if (route.name === 'Point') {
              iconName = focused ? 'map-marker-alt' : 'map-marker-alt';
            } else if (route.name === 'Line') {
              iconName = focused ? 'wave-square' : 'wave-square';
            } else if (route.name === 'Polygon') {
              iconName = focused ? 'draw-polygon' : 'draw-polygon';
            } else if (route.name === 'Sekolah') {
              iconName = focused ? 'users' : 'users';
            }

            return (
              <FontAwesome5 name={iconName} size={size} color={color} regular />
            );
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen
          name="Point"
          component={PointScreen}
          options={{headerShown: true}}
        />
        <Tab.Screen
          name="Line"
          component={LineScreen}
          options={{headerShown: true}}
        />
        <Tab.Screen
          name="Polygon"
          component={PolygonScreen}
          options={{headerShown: true}}
        />
        <Tab.Screen
          name="Sekolah"
          component={SchoolsScreen}
          options={{headerShown: true}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
