import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Card from './card';
import { randomNumberInRange, shuffle } from '../helpers/randomizer';

const styles = StyleSheet.create({
  column: {
    flexDirection: "column",
  },
  fullStretched: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
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
  const [ cardValues ] = useState(getCardValues());
  const [ isMatched, setIsMatched ] = useState(cardValues.map(() => [ false, false, false ]));
  const [ flippedCards, setFlippedCards ] = useState([]);
  const [ steps, setSteps ] = useState(0);
  const onFlip = (row: number, column: number, value: number) => {
    setSteps(steps+1);
    if (flippedCards.length > 0) {
      if (flippedCards[2] === value) {
        const isMatchedState = isMatched.map((state) => [ ...state ]);
        isMatchedState[row][column] = true;
        isMatchedState[flippedCards[0]][flippedCards[1]] = true;
        setIsMatched(isMatchedState);
      }
      setFlippedCards([]);
    } else {
      setFlippedCards([row, column, value]);
    }
  };

  return (
    <>
      <View>
        <Text>{steps}</Text>
      </View>
      <View style={[ styles.column, styles.fullStretched ]}>
      {[0, 1, 2, 3].map((r) => (
        <View key={r} style={[ styles.fullStretched, styles.row ]}>
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
