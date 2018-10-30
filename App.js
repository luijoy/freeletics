import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Constants, Location, Permissions} from 'expo';

export default class App extends React.Component {
  async componentDidMount () {
    const {status} = await Permissions.askAsync (Permissions.LOCATION);
    if (status === 'granted') {
      const {
        coords: {latitude, longitude},
      } = Location.getCurrentPositionAsync ();
    } else {
      alert ("Couldn't get your location");
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
