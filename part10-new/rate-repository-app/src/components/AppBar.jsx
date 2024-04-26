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
  const { username } = useSelf(false);
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab name="Repositories" link="/" />
        {username === undefined ? (
          <View style={styles.signedIn}>
            <AppBarTab name="Sign up" link="/sign-up" />
            <AppBarTab name="Sign in" link="/sign-in" />
          </View>
        ) : (
          <View style={styles.signedIn}>
            <AppBarTab name="Create a review" link="/create-review" />
            <AppBarTab name="My reviews" link="/my-reviews" />
            <SignOutButton />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
