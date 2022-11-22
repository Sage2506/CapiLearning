import React from 'react';
import { Button, Text, View } from 'react-native';

const Home = ({navigation}) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        New function component! Home 🎉
      </Text>
      <Button
        title='Go to collection component'
        onPress={() =>
          navigation.navigate('Collection', { name: 'Jane' })
        }
        />

    </View>
  );
};

export default Home;