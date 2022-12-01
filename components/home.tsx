import React, { useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchConcepts, saveConcept } from '../realm/concepts';


const Home = (props) => {
  const { concepts, navigation } = props

  function newConcept() {
    saveConcept({
      name: 'kurogiri',
      meaning: 'chico de algo',
      phonetic: 'kuogigi',
    })
    props.fetchConcepts();
  }

  useEffect(() => {
    props.fetchConcepts();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        New function component! Home 🎉
      </Text>
      <Text>
        Concepts length {concepts.length}
      </Text>
      <Button
        title='Go to collection component'
        onPress={() =>
          navigation.navigate('Collection', { name: 'Jane' })
        }
      />
      <Button
        title='crear concepto'
        onPress={() => newConcept()}
      />
    </View>
  );
};

const mapStateToProps = store => ({
  concepts: store.concept.concepts
});


const mapDispatchToProps = dispatch => {
  return {
    fetchConcepts: () => { dispatch(fetchConcepts()) }
  }
}
  ;


export default connect(mapStateToProps, mapDispatchToProps)(Home);