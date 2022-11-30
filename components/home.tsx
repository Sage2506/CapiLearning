import React from 'react';
import { Button, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { setConcepts } from '../actions/concept';


const Home = (props) => {
  const {concepts, navigation} = props

  function increaseConcepts (){
    props.setConcepts(concepts + [1]);
  }

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
      title='increase concepts'
      onPress={() => increaseConcepts()}
      />
    </View>
  );
};

const mapStateToProps = store => ({
  concepts : store.concept.concepts
});


const mapDispatchToProps = dispatch => {
  return {
    setConcepts: data => { dispatch (setConcepts(data))}
    }
  }
;


export default connect(mapStateToProps, mapDispatchToProps)(Home);