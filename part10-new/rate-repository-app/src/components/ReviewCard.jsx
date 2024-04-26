import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { format } from 'date-fns';
import theme from '../theme';
import { useNavigate } from 'react-router-native';
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.navButton,
    padding: theme.fontSizes.body,
    display: 'flex',
  },
  container: {
    paddingBottom: theme.fontSizes.body,
    display: 'flex',
    flexDirection: 'row',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewButton: {
    width: '48%',
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    paddingVertical: theme.fontSizes.body,
  },
  view: {
    color: theme.colors.navButton,
    fontWeight: '500',
    alignSelf: 'center',
  },
  deleteButton: {
    width: '48%',
    backgroundColor: theme.colors.red,
    borderRadius: 4,
    paddingVertical: theme.fontSizes.body,
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

export default function ReviewCard({ review, refetch }) {
  const [deleteReview] = useDeleteReview();
  const date = format(new Date(review.createdAt), 'dd.MM.yyyy');
  const navigate = useNavigate();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.score}>
          <Text style={styles.scoreText}>{review.rating}</Text>
        </View>
        <View style={styles.reviewContainer}>
          <Text style={styles.name}>
            {review.user ? review.user.username : review.repository.fullName}
          </Text>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.content}>{review.text}</Text>
        </View>
      </View>
      {review.repository && (
        <View style={styles.buttonsContainer}>
          <Pressable
            onPress={() => {
              navigate(`/${review.repository.id}`);
            }}
            style={styles.viewButton}
          >
            <Text style={styles.view}>View repository</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              Alert.alert(
                'Delete review',
                'Are you sure you want to delete this review?',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'Delete',
                    onPress: async () => {
                      await deleteReview(review.id);
                      refetch();
                    },
                  },
                ]
              );
            }}
            style={styles.deleteButton}
          >
            <Text style={styles.view}>Delete review</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
