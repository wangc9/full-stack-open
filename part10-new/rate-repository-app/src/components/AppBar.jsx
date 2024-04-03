import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { useQuery } from '@apollo/client';
import { GET_SELF } from '../graphql/queries';
import useSelf from '../hooks/useSelf';
import SignOutButton from './SignOutButton';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    display: 'flex',
    flexDirection: 'row',
  },
  signedIn: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const { username } = useSelf();
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab name="Repositories" link="/" />
        {username === undefined ? (
          <AppBarTab name="Sign In" link="/sign-in" />
        ) : (
          <View style={styles.signedIn}>
            <AppBarTab name="Create a review" link="/create-review" />
            <SignOutButton />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
