import { StyleSheet, Pressable, Text } from 'react-native';
import theme from '../theme';

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

export default function AppBarTab({ name }) {
  return (
    <Pressable style={styles.pressable}>
      <Text style={styles.text}>{name}</Text>
    </Pressable>
  );
}
