import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, StatusBar, Pressable, SafeAreaView, Alert } from 'react-native';
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

  useEffect(() => {
    if (props.route.params?.collectionId) {
      props.fetchConcepts(`categoryId === ${props.route.params.collectionId}`)
    }
  }, []);

  useEffect(() => {
    if (props.concepts.length > 2) {
      let shuffledConcepts = props.concepts.map(item => item)
      shuffledConcepts.sort((a, b) => 0.5 - Math.random())
      onChangeConcepts(shuffledConcepts);
      scrambleOptions()
    }
  }, [props.concepts]);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function scrambleOptions() {
    if (concepts.length > 2 && level === 0) {
      let tempOptions = []
      tempOptions.push(concepts[level])
      while (tempOptions.length < 3) {
        let random = getRandomInt(concepts.length)
        let sample = concepts[getRandomInt(concepts.length)]
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
    onChangeLevel(level + 1);
    if (level >= concepts.length - 1) {
      finishGame();
    } else {
      scrambleOptions();
    }
  }

  function finishGame() {
    Alert.alert(
      "Finished",
      'The game ended',
      [
        { text: "OK" }
      ]
    );
    const bestQuantity = results.map( result => result.isCorrect).length
    const bestPercent = (bestQuantity / results.length ) *100
    if(bestQuantity > props.collection.bestQuantity){
      updateCollection(props.route.params.collectionId, {bestQuantity,bestPercent})
    } else if(bestQuantity === props.collection.bestQuantity ) {
      if(bestPercent > props.collection.bestPercent){
        updateCollection(props.route.params.collectionId, {bestQuantity,bestPercent})
      }
    }
  }

  if (concepts.length < 3) {
    return (<Text>Not enought concepts to start game</Text>);
  } else if (level >= concepts.length) {
    return (
      <SafeAreaView style={styles.container}>
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
            {Math.round(results.filter(result => result.isCorrect).length  / results.length * 100)}%
          </Text>
        </View>
      </SafeAreaView>)
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
    fetchConcepts: () => { dispatch(fetchConcepts()) },
    setCollection: (id) => { dispatch(setCollection(findCollectionById(id)))}
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(CollectionGame);