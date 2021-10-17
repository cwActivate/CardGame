import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

const styles = StyleSheet.create({
  close: {
    backgroundColor: "blue",
  },
  container: {
    alignItems: "center",
    borderColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
  },
  open: {
    backgroundColor: "white",
  },
  text: {
    fontSize: 20,
  },
});

const Card = ({ column, isMatched, onFlip, row, value }) => {
  const flipAnimation = useRef(new Animated.Value(0)).current;
  let flipValue = 0;

  flipAnimation.addListener(({ value }) => flipValue = value);
  const [ isFront, setIsFront ] = useState(false);
  useEffect(() => {
    if (!isMatched && isFront) {
      setTimeout(flip, 1000);
    }
  });

  const flip = () => {
    Animated.spring(flipAnimation, {
      friction: 8,
      toValue: isFront ? 0 : 180,
      useNativeDriver: true,
    }).start();
    setIsFront(!isFront);
  };

  const flipInterpolation = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: isFront ? ['180deg', '360deg'] : ["0deg", "180deg"],
  });

  const onPress = () => {
    if (isFront || isMatched) {
      return;
    }
    flip();
    onFlip(row, column, value);
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        style={[
          styles.container,
          isFront || isMatched ? styles.open : styles.close,
          { transform: [{ rotateY: flipInterpolation }] }
        ]}
      >
        <Text style={[ styles.text, { color: isFront || isMatched ? "black" : "white" } ]}>
          {isFront || isMatched ? value : "?"}
        </Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default Card;
