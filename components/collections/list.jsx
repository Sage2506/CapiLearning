import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCollections } from '../../realm/collections';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Button, TouchableWithoutFeedback } from 'react-native';
import { black, primary } from '../../styles/colors';

const CollectionsList = (props) => {
  useEffect(() => {
    props.fetchCollections();
  }, []);

  const renderItem = ({ item: { name, meaning, id } }) => {
    return (
      <TouchableWithoutFeedback onPress={() => props.navigation.navigate('CollectionForm', { id })}>
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
        data={props.collections}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Button
        title='Create collection'
        onPress={() =>
          props.navigation.navigate('CollectionForm')
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
    backgroundColor: primary,
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
  collections: store.collection.collections
});
const mapDispatchToProps = dispatch => {
  return {
    fetchCollections: () => { dispatch(fetchCollections()) }
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(CollectionsList);