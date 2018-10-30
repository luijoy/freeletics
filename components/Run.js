import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {MapView, Location} from 'expo';

type Position = {
  timestamp: number,
  coords: {
    latitude: number,
    longitude: number,
    accuracy: number,
  },
};

type RunProps = {
  distance: number,
  latitude: number,
  longitude: number,
};

type RunState = {
  positions: Position[],
};

export default class Run extends React.Component<RunProps, RunState> {
  state = {
    positions: [],
  };
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
  onPositionChange = (position: Position) => {
    console.log ({position});
    this.setState ({positions: [...this.state.positions, position]});
  };
  render (): React.Node {
    const {positions} = this.state;
    const currentPosition = positions;
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
