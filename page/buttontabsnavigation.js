import * as React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Linking,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
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

function InfoScreen() {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={require('./images/KotaBogor.png')}
        style={{
          width: 150,
          height: 150,
        }}
      />
      <Text style={style.title}>Informasi</Text>
      <Text style={style.subtitle}>
        Aplikasi ini menampilkan peta berisi titik SMA di Kota Bogor serta
        daftar dari seluruh sekolah tersebut.
      </Text>
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

const style = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
  },
});

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
            } else if (route.name === 'Info') {
              iconName = focused ? 'info-circle' : 'info-circle';
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
          name="Sekolah"
          component={SchoolsScreen}
          options={{headerShown: true}}
        />
        <Tab.Screen
          name="Info"
          component={InfoScreen}
          options={{headerShown: true}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
