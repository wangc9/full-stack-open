import {StyleSheet, View} from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    // ...
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Text style={{padding: 10, color: '#eeeeee', fontWeight: '700'}}>Repositories</Text>
    </View>
  );
};

export default AppBar;