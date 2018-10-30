import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';

type MonitorProps = {
  distance: number,
};

export default class Monitor extends React.Component<MonitorProps> {
  render (): React.Node {
    const {distance} = this.props;
    return (
      <View>
        <Text style={{fontSize: 72}}>{distance}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create ({});
