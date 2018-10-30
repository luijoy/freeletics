import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {MapView, Location} from 'expo';
import Monitor from './Monitor';

const {Marker, Polyline} = MapView;

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
  distance: number,
};

export default class Run extends React.Component<RunProps, RunState> {
  state = {
    positions: [],
    distance: 0,
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
    const {positions, distance} = this.state;
    const {latitude, longitude} = this.props;
    const currentPosition = positions.length === 0
      ? {coords: {latitude, longitude}}
      : positions[[positions.length - 1]];
    return (
      <View style={styles.container}>
        <Monitor {...{distance}} />
        <MapView
          provider="google"
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.01,
          }}
          style={styles.map}
        >
          <Marker coordinate={currentPosition.coords} />
          <Polyline
            coordinates={positions.map (position => position.coords)}
            strokeWidth={10}
            strokeColor="#f2b659"
          />
        </MapView>
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
