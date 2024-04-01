import { Pressable, StyleSheet, Text } from 'react-native';
import useAuthStorage from '../hooks/useAuthStorage';
import theme from '../theme';
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
  pressable: {
    paddingHorizontal: 10,
    paddingVertical: theme.fontSizes.subheading,
  },
  text: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.navButton,
  },
});

export default function SignOutButton() {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  return (
    <Pressable
      style={styles.pressable}
      onPress={async () => {
        await authStorage.removeAccessToken();
        await apolloClient.resetStore();
      }}
    >
      <Text style={styles.text}>Sign Out</Text>
    </Pressable>
  );
}
