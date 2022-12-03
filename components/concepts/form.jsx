import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Text, View, Alert } from 'react-native';
import { SafeAreaView, StyleSheet, TextInput, Button } from "react-native";
import { fetchConcepts, findConceptById, saveConcept, updateConcept } from '../../realm/concepts';
import { Picker } from '@react-native-picker/picker';

const ConceptForm = (props) => {
  const [name, onChangeName] = React.useState("");
  const [meaning, onChangeMeaning] = React.useState("");
  const [phonetic, onChangePhonetic] = React.useState("");
  const [collectionId, onChangeCollection] = React.useState(null);
  const [editMode, onChangeEditMode] = React.useState(false);

  useEffect(() => {
    if (props.route.params?.id) {
      const concept = findConceptById(props.route.params.id);
      if (concept) {
        onChangeEditMode(true);
        onChangeName(concept.name);
        onChangeMeaning(concept.meaning);
        onChangePhonetic(concept.phonetic);
        onChangeCollection(concept.collectionId)
      }
    }
    }, []);

  function applyChanges() {
    props.fetchConcepts();
    props.navigation.goBack();
  }

  function remove() {
    deleteConcept(props.route.params.id);
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

  function newConcept() {
    concept = { name, meaning, phonetic, collectionId }
    if( name.trim() === '' || meaning.trim() === '' || phonetic.trim() === '' || !collectionId ) {
      throwError('Missing field(s)');
    } else {
      editMode ? updateConcept(props.route.params?.id, concept) : saveConcept(concept);
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
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeMeaning}
        value={meaning}
        placeholder='Meaning'
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePhonetic}
        value={phonetic}
        placeholder='Phonetic'
      />
      <Picker
        selectedValue={collectionId}
        onValueChange={(itemValue, itemIndex) =>
          onChangeCollection(itemValue)
        }>
          <Picker.Item label="Select a collection" />
        {props.collections.map((item, index) => (
          <Picker.Item key={item.id} label={item.name} value={item.id} />
        ))}
      </Picker>
      {editMode && <Button
        title='borrar'
        onPress={() => remove()}
      />}
      <Button
        title='Guardar'
        onPress={() => newConcept()}
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
  },
});

const mapStateToProps = store => ({
  collections: store.collection.collections
});
const mapDispatchToProps = dispatch => {
  return {
    fetchConcepts: () => { dispatch(fetchConcepts()) }
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(ConceptForm);