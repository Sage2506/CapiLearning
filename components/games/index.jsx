import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, StatusBar, Pressable, SafeAreaView, Alert } from 'react-native';
import { fetchConcepts } from '../../realm/concepts';

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
    if (concepts.length > 2) {
      let tempOptions = [concepts[level]]
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
    let answer = false
    if (option.id === concepts[level].id) {
      answer = true;
    }
    onChangeResults(results + [{ ...option, answer }])
    onChangeLevel(level + 1);
    if (level > concepts.length - 1) {
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
  }

  if (concepts.length < 3) {
    return <Text>Not enought concepts to start game</Text>
  } else if (level >= concepts.length) {
    return <Text>Game finished</Text>
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
            <Text style={styles.text}>
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
  card:{
    marginVertical: 4,
    alignSelf:'center'
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  title: {
    fontSize: 32,
  },
  subtitle: {
    fontSize: 16,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginVertical: 4,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

const mapStateToProps = store => ({
  concepts: store.concept.concepts
});
const mapDispatchToProps = dispatch => {
  return {
    fetchConcepts: () => { dispatch(fetchConcepts()) }
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(CollectionGame);