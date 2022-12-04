import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { SafeAreaView, StyleSheet, TextInput, Button, Alert } from "react-native";
import { fetchCollections, findCollectionById, saveCollection, updateCollection } from '../../realm/collections';
import { black, disabled } from '../../styles/colors';

const CollectionForm = (props) => {
  const [name, onChangeName] = React.useState("");
  const [editMode, onChangeEditMode] = React.useState(false);

  useEffect(() => {
    if (props.route.params?.id) {
      const collection = findCollectionById(props.route.params.id);
      if (collection) {
        onChangeEditMode(true);
        onChangeName(collection.name);
      }
    }
  }, []);

  function applyChanges() {
    props.fetchCollections();
    props.navigation.goBack();
  }

  function remove() {
    deleteCollection(props.route.params.id);
    applyChanges();
  }

  function throwError(msg){
    Alert.alert(
      "Error",
      msg,
      [
        { text: "OK"}
      ]
    );
  }

  function newCollection() {
    collection = { name }
    if(name.trim() === ''){
      throwError('Missing field');
    } else {
      editMode ? updateCollection(props.route.params?.id, collection) : saveCollection(collection);
      applyChanges();
    }
  }

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
        placeholder='Name'
        placeholderTextColor={disabled}
      />

      {editMode &&
        <Button
          title='Ver conceptos'
          onPress={() => props.navigation.navigate('Concepts', { collectionId: props.route.params.id })}
        />
      }
      {editMode &&
        <Button
          title='borrar'
          onPress={() => remove()}
        />
      }
      {editMode &&
        <Button
          title='Start Game'
          onPress={() => props.navigation.navigate('CollectionGame', { collectionId: props.route.params.id })}
        />
      }
      <Button
        title='Guardar'
        onPress={() => newCollection()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: black,
  },
});

const mapStateToProps = store => ({

});

const mapDispatchToProps = dispatch => {
  return {
    fetchCollections: () => { dispatch(fetchCollections()) }
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(CollectionForm);