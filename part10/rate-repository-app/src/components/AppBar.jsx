import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';
import {Link} from 'react-router-native';
import {useApolloClient, useQuery} from '@apollo/client';
import {useEffect, useState} from 'react';
import {useAuthStorage} from '../hooks/useAuthStorage';
import {ME} from '../graphql/Query';

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
  const authStorage = useAuthStorage();
  const client = useApolloClient();
  const [signed, setSigned] = useState(false);
  const [user, setUser] = useState(null);
  const {data} = useQuery(ME, {
    context: {
      headers: {
        authorization: authStorage.getAccessToken ? `Bearer ${authStorage.getAccessToken()}` : null
      }
    },
    pollInterval: 500,
  });
  const getUser = () => {
    setSigned(true);
    setUser(data.me.username);
  };

  const press = async () => {
    await authStorage.clearAccessToken();
    await client.resetStore();
  };

  useEffect(() => {
    const getToken = async () => {
      const response = await authStorage.getAccessToken();
      return response;
    }
    getToken().then(res => res ? getUser() : setSigned(false));
  }, [authStorage.getAccessToken()])
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <Link to='/repositories'><Text style={{padding: 10, color: '#eeeeee', fontWeight: '700'}}>Repositories</Text></Link>
        <Link to='/create_review'><Text style={{padding: 10, color: '#eeeeee', fontWeight: '700'}}>Create Review</Text></Link>
        {!signed && <Link to='/sign_in'><Text style={{padding: 10, color: '#eeeeee', fontWeight: '700'}}>Sign In</Text></Link>}
        {signed && <Pressable onPress={press}><Text style={{padding: 10, color: '#eeeeee', fontWeight: '700'}}>{user} Sign Out</Text></Pressable>}
      </ScrollView>
    </View>
  );
};

export default AppBar;