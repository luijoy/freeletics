import * as React from 'react';
import {StyleSheet, View, Animated} from 'react-native';

type PinState = {
  animation: Animated.Value,
};

export default class Pin extends React.Component<{}, PinState> {
  state = {
    animation: new Animated.Value (0),
  };

  componentDidMount () {
    const {animation} = this.state;
    Animated.loop (
      Animated.sequence ([
        Animated.timing (animation, {
          toValue: 1,
          duration: 1000,
        }),
        Animated.timing (animation, {
          toValue: 0,
          duration: 1000,
        }),
      ]),
      {
        useNativeDriver: true,
      }
    ).start ();
  }
  render (): React.Node {
    const {animation} = this.state;
    const scale = animation.interpolate ({
      inputRange: [0, 1],
      outputRange: [1, 1.3],
    });
    return (
      <View style={styles.outerPin}>
        <View style={styles.pin}>
          <Animated.View style={[styles.innerPin, {transform: [{scale}]}]} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  outerPin: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(242,182,89, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pin: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerPin: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#f2b659',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
