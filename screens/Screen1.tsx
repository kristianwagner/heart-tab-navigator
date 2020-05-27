import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
export const Screen1 = ({navigation}) => {
  return (
    <View style={styles.screen}>
      <Text>Screen 1</Text>
      <Button
        title="asda"
        onPress={() => {
          navigation.navigate('/screen-2');
        }}
      />
    </View>
  );
};

export const Screen2 = () => {
  return (
    <View style={styles.screen}>
      <Text>Screen 2</Text>
    </View>
  );
};

export const Screen3 = () => {
  return (
    <View style={styles.screen}>
      <Text>Screen 3</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
