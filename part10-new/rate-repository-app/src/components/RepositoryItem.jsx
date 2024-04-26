import {
  Image,
  StyleSheet,
  Text as NativeText,
  View,
  Pressable,
  Linking,
  FlatList,
} from 'react-native';
import theme from '../theme';
import Text from './Text';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
import ReviewCard from './ReviewCard';

const styles = StyleSheet.create({
  container: {
    padding: theme.fontSizes.body,
    marginTop: 0.25 * theme.fontSizes.body,
    display: 'flex',
    backgroundColor: theme.colors.navButton,
  },
  main: {
    paddingBottom: 0.5 * theme.fontSizes.body,
    display: 'flex',
    flexDirection: 'row',
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  secondary: {
    display: 'flex',
    paddingLeft: 10,
    width: '80%',
  },
  tag: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.navButton,
    paddingHorizontal: 6,
    paddingVertical: 0.35 * theme.fontSizes.body,
    alignSelf: 'flex-start',
    borderRadius: 5,
  },
  dataContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2 * theme.fontSizes.subheading,
    paddingTop: theme.fontSizes.subheading,
    width: '100%',
  },
  data: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    paddingVertical: theme.fontSizes.body,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    marginTop: 8,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.navButton,
    fontWeight: theme.fontWeights.bold,
  },
  separator: {
    height: 10,
    backgroundColor: theme.colors.textSecondary,
  },
});

export function Repository({
  calculator,
  id,
  fullName,
  description,
  language,
  forksCount,
  stargazersCount,
  ratingAverage,
  reviewCount,
  ownerAvatarUrl,
}) {
  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.main}>
        <Image style={styles.img} source={{ uri: ownerAvatarUrl }} />
        <View style={styles.secondary}>
          <Text
            color="primary"
            fontSize="subheading"
            fontWeight="bold"
            style={{ paddingVertical: 2 }}
            testID="fullname"
          >
            {fullName}
          </Text>
          <Text
            color="textSecondary"
            fontSize="body"
            style={{
              paddingTop: 2,
              paddingBottom: 12,
              paddingRight: 4,
              width: '100%',
            }}
            testID="description"
          >
            {description}
          </Text>
          <NativeText style={styles.tag} testID="language">
            {language}
          </NativeText>
        </View>
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.data}>
          <Text
            fontSize="subheading"
            fontWeight="bold"
            style={{ paddingBottom: 4 }}
            testID="star-count"
          >
            {calculator(stargazersCount)}
          </Text>
          <Text color="textSecondary" style={{ paddingTop: 4 }}>
            Stars
          </Text>
        </View>
        <View style={styles.data}>
          <Text
            fontSize="subheading"
            fontWeight="bold"
            style={{ paddingBottom: 4 }}
            testID="fork-count"
          >
            {calculator(forksCount)}
          </Text>
          <Text color="textSecondary" style={{ paddingTop: 4 }}>
            Forks
          </Text>
        </View>
        <View style={styles.data}>
          <Text
            fontSize="subheading"
            fontWeight="bold"
            style={{ paddingBottom: 4 }}
            testID="review-count"
          >
            {calculator(reviewCount)}
          </Text>
          <Text color="textSecondary" style={{ paddingTop: 4 }}>
            Reviews
          </Text>
        </View>
        <View style={styles.data}>
          <Text
            fontSize="subheading"
            fontWeight="bold"
            style={{ paddingBottom: 4 }}
            testID="rating"
          >
            {calculator(ratingAverage)}
          </Text>
          <Text color="textSecondary" style={{ paddingTop: 4 }}>
            Rating
          </Text>
        </View>
      </View>
      {id && (
        <Pressable
          style={styles.button}
          onPress={async () => {
            await Linking.openURL(repo.repository.url);
          }}
        >
          <Text style={styles.buttonText}>Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  );
}

export const ItemSeparator = () => <View style={styles.separator} />;

export default function RepositoryItem(props) {
  let { id } = useParams();
  const {
    data: repo,
    error,
    loading,
  } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id },
    skip: id === undefined,
    fetchPolicy: 'cache-and-network',
  });
  if (loading) {
    return <Text>loading</Text>;
  }
  let fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl;
  const calculator = (number) => {
    if (number < 1000) {
      return number;
    }
    const result = number / 1000;

    return `${result.toFixed(1)}k`;
  };

  if (id) {
    fullName = repo.repository.fullName;
    description = repo.repository.description;
    language = repo.repository.language;
    forksCount = repo.repository.forksCount;
    stargazersCount = repo.repository.stargazersCount;
    ratingAverage = repo.repository.ratingAverage;
    reviewCount = repo.repository.reviewCount;
    ownerAvatarUrl = repo.repository.ownerAvatarUrl;
  } else {
    fullName = props.props.fullName;
    description = props.props.description;
    language = props.props.language;
    forksCount = props.props.forksCount;
    stargazersCount = props.props.stargazersCount;
    ratingAverage = props.props.ratingAverage;
    reviewCount = props.props.reviewCount;
    ownerAvatarUrl = props.props.ownerAvatarUrl;
  }

  if (id) {
    return (
      <FlatList
        data={repo.repository.reviews.edges}
        renderItem={({ item }) => <ReviewCard review={item.node} />}
        ItemSeparatorComponent={<ItemSeparator />}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={() => (
          <Repository
            calculator={calculator}
            id={id}
            fullName={fullName}
            description={description}
            language={language}
            forksCount={forksCount}
            stargazersCount={stargazersCount}
            ratingAverage={ratingAverage}
            reviewCount={reviewCount}
            ownerAvatarUrl={ownerAvatarUrl}
          />
        )}
      />
    );
  }

  return (
    <Repository
      calculator={calculator}
      id={id}
      fullName={fullName}
      description={description}
      language={language}
      forksCount={forksCount}
      stargazersCount={stargazersCount}
      ratingAverage={ratingAverage}
      reviewCount={reviewCount}
      ownerAvatarUrl={ownerAvatarUrl}
    />
  );
}
