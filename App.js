import React from 'react';
import {StyleSheet, ActivityIndicator, View, StatusBar} from 'react-native';
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
    return (
      <React.Fragment>
        <StatusBar barStyle="light-content" />
        {ready && <Run distance={200} {...{latitude, longitude}} />}
        {!ready &&
          <View style={styles.container}>
            <ActivityIndicator size="large" color="white" />
          </View>}
      </React.Fragment>
    );
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
