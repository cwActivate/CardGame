import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';

import Card from './card';
import { randomNumberInRange, shuffle } from '../helpers/randomizer';

const styles = StyleSheet.create({
  column: {
    flexDirection: "column",
  },
  container: {
    flex: 1,
  },
  fullStretched: {
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    backgroundColor: "gray",
    flexDirection: "row",
    height: 50,
    justifyContent: "space-between",
  },
  headerGroup: {
    alignItems: "center",
    flexDirection: "row",
    height: 50,
  },
  modal: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalMessage: {
    color: "black",
    fontSize: 22,
    textAlign: "center",
  },
  modalTitle: {
    color: "black",
    fontSize: 24,
    textAlign: "center",
  },
  modalCloseButton: {
    borderRadius: 10,
  },
  modalCloseButtonText: {
    color: "cyan",
    fontSize: 20,
    height: 50,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
  },
  restartButtonText: {
    color: "lightblue",
    fontSize: 22,
    textAlign: "center",
  },
  stepText: {
    color: "lightblue",
    fontSize: 24,
    textAlign: "center",
  },
  stepTitle: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
  },
});


const Board = () => {
  const getCardValues = () => {
    const randomNumbers = [0, 1, 2, 3, 4, 5].map(() => randomNumberInRange(1, 100));
    let values = [ ...randomNumbers, ...randomNumbers ];
    shuffle(values);
    const cardValues = [0, 3, 6, 9].map((i) => values.slice(i, i+3));
    return cardValues;
  };
  const [ cardValues, setCardValues ] = useState(getCardValues());
  const [ flippedCards, setFlippedCards ] = useState([]);
  const getInitialMatchedState = () => cardValues.map(() => [ false, false, false ]);
  const [ isMatched, setIsMatched ] = useState(getInitialMatchedState());
  const [ matchedCount, setMatchedCount ] = useState(0);
  const [ steps, setSteps ] = useState(0);

  const onFlip = (row: number, column: number, value: number) => {
    setSteps(steps+1);
    if (flippedCards.length > 0) {
      const [ r, c, v ] = flippedCards;
      setFlippedCards([]);
      if (flippedCards[2] === value) {
        const isMatchedState = isMatched.map((state) => [ ...state ]);
        isMatchedState[row][column] = true;
        isMatchedState[r][c] = true;
        setIsMatched(isMatchedState);
        setMatchedCount(matchedCount+1);
      }
    } else {
      setFlippedCards([row, column, value]);
    }
  };

  const reset = () => {
    setCardValues(getCardValues());
    setFlippedCards([]);
    setIsMatched(getInitialMatchedState());
    setMatchedCount(0);
    setSteps(0);
  };

  return (
    <>
      <Modal
        animationType={"fade"}
        visible={true}
      >
        <View style={[styles.container, styles.modal]}>
          <Text style={styles.modalTitle}>Congratulations!</Text>
          <Text style={styles.modalMessage}>You win the game by {steps} steps!</Text>
          <TouchableNativeFeedback onPress={reset} style={styles.modalCloseButton}>
            <Text style={styles.modalCloseButtonText}>Try another round</Text>
          </TouchableNativeFeedback>
        </View>
      </Modal>
      <View >
        <View style={[ styles.header ]}>
          <TouchableNativeFeedback onPress={reset}>
            <Text style={styles.restartButtonText}>RESTART</Text>
          </TouchableNativeFeedback>
          <View style={[ styles.headerGroup ]}>
            <Text style={styles.stepTitle}>STEPS: </Text>
            <Text style={styles.stepText}>{steps}</Text>
          </View>
        </View>
      </View>
      <View style={[ styles.column, styles.container, styles.fullStretched ]}>
        {[0, 1, 2, 3].map((r) => (
          <View key={r} style={[ styles.container, styles.fullStretched, styles.row ]}>
            {[0, 1, 2].map((c) => <Card
              column={c}
              key={c}
              isMatched={isMatched[r][c]}
              onFlip={onFlip}
              row={r}
              value={cardValues[r][c]}
            />)}
          </View>
        ))}
      </View>
    </>
  );
};

export default Board;
