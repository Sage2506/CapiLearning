import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchConcepts } from '../../realm/concepts';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Button, TouchableWithoutFeedback } from 'react-native';

const ConceptsCollection = (props) => {
  useEffect(() => {
    if(props.route.params?.collectionId){
      console.log("ruta filtrada por categoria", props.route.params.collectionId)
      props.fetchConcepts(`categoryId === ${props.route.params.collectionId}`)
      console.log(props.concepts)
    }else{
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
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  subtitle: {
    fontSize: 16,
  }
});

const mapStateToProps = store => ({
  concepts: store.concept.concepts
});
const mapDispatchToProps = dispatch => {
  return {
    fetchConcepts: () => { dispatch(fetchConcepts()) }
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(ConceptsCollection);