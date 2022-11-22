import React from 'react';
import { Text, View, Button } from 'react-native';

const Collection = ({navigation}) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        New function component! Collection 🎉
      </Text>
      <Button
        title='Go Back'
        onPress={() =>
          navigation.goBack()
        }
        />
    </View>
  );
};

export default Collection;