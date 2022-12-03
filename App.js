/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import type { Node } from 'react';
import {  Text,  View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/home';
import Collection from './components/collection';
import ConceptForm from './components/concepts/form';
import ConceptsCollection from './components/concepts/list';
import CollectionsList from './components/collections/list';
import CollectionForm from './components/collections/form';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="Collection"
          component={Collection}
          options={{ title: 'Collection' }}
        />
        <Stack.Screen
          name="ConceptForm"
          component={ConceptForm}
          options={{ title: 'Form' }}
        />
        <Stack.Screen
          name="Concepts"
          component={ConceptsCollection }
          options={{ title: 'Concepts' }}
        />
        <Stack.Screen
          name="Collections"
          component={ CollectionsList }
          options={{ title: 'Collections' }}
        />
        <Stack.Screen
          name="CollectionForm"
          component={ CollectionForm }
          options={{ title: 'Form' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default App;
