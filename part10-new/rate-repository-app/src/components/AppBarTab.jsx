import { StyleSheet, Pressable, Text } from 'react-native';
import theme from '../theme';
import { useNavigate } from 'react-router-native';

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

export default function AppBarTab({ name, link }) {
  const navigate = useNavigate();

  return (
    <Pressable
      style={styles.pressable}
      onPress={() => {
        navigate(link);
      }}
    >
      <Text style={styles.text}>{name}</Text>
    </Pressable>
  );
}
