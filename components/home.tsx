import React, { useEffect } from 'react';
import { Button, StatusBar, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchConcepts } from '../realm/concepts';
import { fetchCollections } from '../realm/collections';


const Home = (props) => {
  const { navigation } = props

  useEffect(() => {
    props.fetchConcepts();
    props.fetchCollections();
  }, []);

  return (
    <View style={{ flex: 1, marginTop: StatusBar.currentHeight || 0}}>

      <Button
        title='Concepts'
        onPress={() =>
          navigation.navigate('Concepts')
        }
      />
      <Button
        title='Collections'
        onPress={() =>
          navigation.navigate('Collections')
        }
      />
    </View>
  );
};

const mapStateToProps = store => ({
  concepts: store.concept.concepts
});


const mapDispatchToProps = dispatch => {
  return {
    fetchConcepts: () => { dispatch(fetchConcepts()) },
    fetchCollections: () => { dispatch(fetchCollections()) },
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);