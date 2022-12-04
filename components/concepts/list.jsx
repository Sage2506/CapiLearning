import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchConcepts } from '../../realm/concepts';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Button, TouchableWithoutFeedback } from 'react-native';
import { black, primary } from '../../styles/colors';

const ConceptsCollection = (props) => {
  useEffect(() => {
    if (props.route.params?.collectionId) {
      props.fetchConcepts(`collectionId == ${props.route.params.collectionId}`)
    } else {
      props.fetchConcepts();
    }
  }, []);

  const renderItem = ({ item: { name, meaning, id } }) => {
    return (
      <TouchableWithoutFeedback onPress={() => props.navigation.navigate('ConceptForm', { id })}>
        <View style={styles.item}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>{meaning}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={props.concepts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Button
        title='Crear concepto'
        onPress={() =>
          props.navigation.navigate('ConceptForm')
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: primary ,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color: black,
  },
  subtitle: {
    fontSize: 16,
    color: black,
  }
});

const mapStateToProps = store => ({
  concepts: store.concept.concepts
});
const mapDispatchToProps = dispatch => {
  return {
    fetchConcepts: (filter) => { dispatch(fetchConcepts(filter)) }
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(ConceptsCollection);