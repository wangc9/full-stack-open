import { StyleSheet, Text, View } from 'react-native';
import { format } from 'date-fns';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.navButton,
    padding: theme.fontSizes.body,
    display: 'flex',
    flexDirection: 'row',
  },
  score: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    justifyContent: 'center',
    marginRight: theme.fontSizes.body,
  },
  scoreText: {
    fontWeight: '500',
    color: theme.colors.primary,
    alignSelf: 'center',
  },
  reviewContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
  },
  name: {
    fontWeight: '500',
    color: theme.colors.textPrimary,
    paddingTop: 0.5 * theme.fontSizes.body,
    paddingBottom: 0.5 * theme.fontSizes.body,
  },
  date: {
    color: theme.colors.textSecondary,
    paddingVertical: 0.25 * theme.fontSizes.body,
  },
  content: {
    paddingTop: 0.5 * theme.fontSizes.body,
  },
});

export default function ReviewCard({ review }) {
  const date = format(new Date(review.createdAt), 'dd.MM.yyyy');

  return (
    <View style={styles.container}>
      <View style={styles.score}>
        <Text style={styles.scoreText}>{review.rating}</Text>
      </View>
      <View style={styles.reviewContainer}>
        <Text style={styles.name}>{review.user.username}</Text>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.content}>{review.text}</Text>
      </View>
    </View>
  );
}
