import {ScrollView, StyleSheet, View} from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';
import {Link} from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    flexDirection: 'row',
    // ...
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <Link to='/repositories'><Text style={{padding: 10, color: '#eeeeee', fontWeight: '700'}}>Repositories</Text></Link>
        <Link to='/sign_in'><Text style={{padding: 10, color: '#eeeeee', fontWeight: '700'}}>Sign In</Text></Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;