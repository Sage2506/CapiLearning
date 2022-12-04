import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, StatusBar, Pressable, SafeAreaView, Alert, ScrollView } from 'react-native';
import { fetchConcepts } from '../../realm/concepts';
import { black, primary, secondary, warning, white } from '../../styles/colors';
import { title } from '../../styles/texts';
import { findCollectionById, updateCollection } from '../../realm/collections';
import { setCollection } from '../../actions/collection'

const CollectionGame = (props) => {
  const [concepts, onChangeConcepts] = React.useState([]);
  const [level, onChangeLevel] = React.useState(0);
  const [options, onChangeOptions] = React.useState([]);
  const [results, onChangeResults] = React.useState([]);
  const [isGameFinished, onChangeGameFinished] = React.useState(false);

  useEffect(() => {
    if (props.route.params?.collectionId) {
      props.fetchConcepts(`collectionId == ${props.route.params.collectionId}`)
    }
  }, []);

  useEffect(() => {
    if (props.concepts.length > 2 && concepts.length === 0 && countUnique(props.concepts.map( concept => concept.collectionId)) === 1  ) {
      let shuffledConcepts = props.concepts.map(item => item)
      shuffledConcepts.sort((a, b) => 0.5 - Math.random())
      onChangeConcepts(shuffledConcepts);
    }
  }, [props.concepts])

  useEffect(() => {
    scrambleOptions()
  }, [concepts, level])

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function countUnique(iterable){
    return new Set(iterable).size;
  }
  function scrambleOptions() {
    if (concepts.length > 2 && level <= concepts.length) {
      let tempOptions = []
      tempOptions.push(concepts[level])
      while (tempOptions.length < 3) {
        let random = getRandomInt(concepts.length)
        let sample = concepts[random]
        if (!tempOptions.map(option => option.name).includes(sample.name)) {
          tempOptions.push(sample);
        }
      }
      onChangeOptions(tempOptions.sort((a, b) => 0.5 - Math.random()));
    }
  }

  function selectOption(option) {
    let currentConcept = concepts[level]
    let newResults = results
    if (option.id === concepts[level].id) {
      isCorrect = true;
      currentConcept['isCorrect'] = true
    } else {
      currentConcept['isCorrect'] = false
      currentConcept['myAnswer'] = option.meaning;
    }
    newResults.push(currentConcept)
    onChangeResults(newResults)
    if (level === concepts.length - 1) {
      finishGame();
    } else {
      onChangeLevel(level + 1);
    }
  }

  function finishGame() {
    onChangeGameFinished(true)
    Alert.alert(
      "Finished",
      'The game ended',
      [
        { text: "OK" }
      ]
    );
    const bestQuantity = results.map(result => result.isCorrect).length
    const bestPercent = (bestQuantity / results.length) * 100
    if (bestQuantity > props.collection.bestQuantity) {
      updateCollection(props.route.params.collectionId, { bestQuantity, bestPercent })
    } else if (bestQuantity === props.collection.bestQuantity) {
      if (bestPercent > props.collection.bestPercent) {
        updateCollection(props.route.params.collectionId, { bestQuantity, bestPercent })
      }
    }
  }

  if (concepts.length < 3) {
    return (<Text>Not enought concepts to start game</Text>);
  } else if (isGameFinished) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View>
            <Text style={styles.title}>Game finished</Text>
          </View>
          {results.map(result => (
            <View key={result.id} style={{ ...styles.item, backgroundColor: result.isCorrect ? primary : warning }} >
              <Text style={styles.title}>
                {result.name}
              </Text>
              {!result.isCorrect && <Text style={styles.subtitle}>
                Your answer: {result.myAnswer}
              </Text>}
              <Text style={styles.subtitle}>
                {result.meaning}
              </Text>
            </View>
          ))}
          <View>
            <Text style={styles.title}>
              Score
            </Text>
            <Text style={styles.text}>
              {results.filter(result => result.isCorrect).length} out of {results.length}
            </Text>
            <Text style={styles.text}>
              {Math.round(results.filter(result => result.isCorrect).length / results.length * 100)}%
            </Text>
          </View>
        </ScrollView>

      </SafeAreaView>
    )
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.card}>
          <View style={styles.item}>
            <Text style={styles.title}>{concepts[level].name}</Text>
          </View>
        </Text>
        {options.map(option => (
          <Pressable
            style={styles.button}
            key={option.id}
            onPress={() => selectOption(option)}
          >
            <Text style={styles.option}>
              {option.meaning}
            </Text>
          </Pressable>
        ))}
      </SafeAreaView>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    padding: 8,
  },
  card: {
    marginVertical: 4,
    alignSelf: 'center'
  },
  item: {
    backgroundColor: primary,
    padding: 20,
    marginVertical: 8,
  },
  title: {
    fontSize: 32,
    color: black
  },
  subtitle: {
    fontSize: 16,
    color: black
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginVertical: 4,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: secondary,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: black
  },
  option: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: white
  },
});
const mapStateToProps = store => ({
  concepts: store.concept.concepts,
  collection: store.collection.collection,
});
const mapDispatchToProps = dispatch => {
  return {
    fetchConcepts: (filter) => { dispatch(fetchConcepts(filter)) },
    setCollection: (id) => { dispatch(setCollection(findCollectionById(id))) }
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(CollectionGame);