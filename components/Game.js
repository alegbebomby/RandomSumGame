import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button } from 'react-native';
import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';
const Game = (props) => {
  const generateRandom = () => {
    return Array.from({ length: randomNumberCount }).map(() => 1 + Math.floor(10 * Math.random()))
  }
  const randomNumberCount = props.randomNumberCount;
  const [randomNumberArr, setRandomNumberArr] = useState(generateRandom);
  //const targetSum= randomNumberArr.slice(0, randomNumberCount-2).reduce((acc, curr)=> acc+curr,0);
  const [targetSum, setTargetSum] = useState(randomNumberArr.slice(0, randomNumberCount - 2).reduce((acc, curr) => acc + curr, 0));
  const [suffleRandomNumberArr, setSuffleRandomNumberArr] = useState(shuffle(randomNumberArr));
  const [selectedList, setSelectedList] = useState([])
  const [status, setStatus] = useState('PLAYING');
  const [remainingSeconds, setRemainingSeconds] = useState(props.initialSeconds);

  useEffect(() => {
    let id = setInterval(() => {
      setRemainingSeconds(remainingSeconds - 1);
    }, 1000);
    if (remainingSeconds == 0 || status != 'PLAYING') {
      clearInterval(id)
    }
    return () => clearInterval(id);
  }, [remainingSeconds]);
  useEffect(() => {
    gameStatus();
  });

  useEffect(() => {
    console.log('calla restart game');
    restartGame();
  }, []);


  const updateSelected = (value) => {
    setSelectedList([...selectedList, value]);
  }
  const isNumberSelected = (id) => {
    return selectedList.indexOf(id) >= 0;
  }

  const gameStatus = () => {

    const selectedSum = selectedList.reduce((acc, item) => {
      return acc + suffleRandomNumberArr[item];
    }, 0);
    if (remainingSeconds == 0) {
      return setStatus('LOST');
    }
    if (selectedSum < targetSum) {
      return setStatus('PLAYING');
    }
    if (selectedSum == targetSum) {
      return setStatus('WON');
    } if (selectedSum > targetSum) {
      return setStatus('LOST');
    }
  }

  const restartGame = () => {
    console.log()
    setStatus('PLAYING');
    setRandomNumberArr(generateRandom);
    setTargetSum(randomNumberArr.slice(0, randomNumberCount - 2).reduce((acc, curr) => acc + curr, 0));
    setSuffleRandomNumberArr(shuffle(randomNumberArr));
    setRemainingSeconds(props.initialSeconds);
    setSelectedList([]);
  }
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.targetSum}>{targetSum}</Text>
      </View>
      <View style={styles.randomContainer}>
        {suffleRandomNumberArr.map((randomNumber, index) => {
          return <RandomNumber key={index} id={index} randomNumber={randomNumber} isDisabled={isNumberSelected(index) || status == 'LOST' || status == 'WON'} onPress={updateSelected} />
        })}
        {/* //TODO: shuffle number */}
      </View>
      <View style={styles.container}>
        <Text style={[styles.targetSum, styles[`STATUS_${status}`]]}>{status}</Text>
      </View>
      {status != 'PLAYING' && <Button
        onPress={restartGame}
        title="Restart Game"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />}

    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  targetSum: {
    fontSize: 40,
    backgroundColor: 'cyan',
    paddingHorizontal: 50,
    textAlign: 'center'
  },
  randomContainer: {
    flex: 1,
    backgroundColor: '#fff',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  randomNumber: {
    paddingHorizontal: 20,
    marginVertical: 15,
    textAlign: 'center',
    width: 100,
    fontSize: 40,
    backgroundColor: 'gray',

  },
  STATUS_PLAYING: {
    backgroundColor: 'cyan',
  },
  STATUS_WON: {
    backgroundColor: 'green',
  },
  STATUS_LOST: {
    backgroundColor: 'red',
  }
});

Game.propTypes = {
  randomNumberCount: PropTypes.number.isRequired,
  initialSeconds: PropTypes.number.isRequired
}
export default Game;
