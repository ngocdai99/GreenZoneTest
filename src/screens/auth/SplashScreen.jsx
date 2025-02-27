import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppContext } from '../../context/appContext';
import { MainGraph } from '../../layouts/graphs';
const SplashScreen = ({ navigation }) => {
  const { authState, authDispatch } = useAppContext()

  useEffect(() => {
    const timer = setTimeout(() => {

      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      });

    }, 1000);


    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
});
