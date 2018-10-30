import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {MapView, Location} from 'expo';

type RunProps = {
  distance: number,
  latitude: number,
  longitude: number,
};

export default class Run extends React.Component<RunProps> {
  async componentDidMount () {
    const options = {
      enableHighAccuracy: true,
      timeInterval: 1000,
      distanceInterval: 1,
    };
    this.listener = await Location.watchPositionAsync (
      options,
      this.onPositionChange
    );
  }

  componentWillUnmount () {
    this.listener.remove ();
  }
  onPositionChange = position => {
    console.log ({position});
  };
  render (): React.Node {
    return (
      <View style={styles.container}>
        <MapView provider="google" style={styles.map} />
      </View>
    );
  }
}
const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  map: {flex: 1},
});
