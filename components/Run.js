import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {MapView} from 'expo';

type RunProps = {
  distance: number,
  latitude: number,
  longitude: number,
};

export default class Run extends React.Component<RunProps> {
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
