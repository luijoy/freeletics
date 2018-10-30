import React from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import {Constants, Location, Permissions} from 'expo';

import Run from './components/Run';

type AppState = {
  ready: boolean,
  latitude: number,
  longitude: number,
};

export default class App extends React.Component<{}, AppState> {
  state = {
    ready: false,
  };

  async componentDidMount () {
    const {status} = await Permissions.askAsync (Permissions.LOCATION);
    if (status === 'granted') {
      const {
        coords: {latitude, longitude},
      } = await Location.getCurrentPositionAsync ();
      this.setState ({ready: true, longitude, latitude});
    } else {
      alert ("Couldn't get your location");
    }
  }

  render () {
    const {ready, latitude, longitude} = this.state;
    if (!ready) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="white" />
        </View>
      );
    }
    return <Run distance={200} {...{latitude, longitude}} />;
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#29252b',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
