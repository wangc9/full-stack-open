import { Image, StyleSheet, Text as NativeText, View } from 'react-native';
import theme from '../theme';
import Text from './Text';

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
});

export default function RepositoryItem(props) {
  const calculator = (number) => {
    if (number < 1000) {
      return number;
    }
    const result = number / 1000;

    return `${result.toFixed(1)}k`;
  };

  const {
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
  } = props.props;

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Image style={styles.img} source={{ uri: ownerAvatarUrl }} />
        <View style={styles.secondary}>
          <Text
            color="primary"
            fontSize="subheading"
            fontWeight="bold"
            style={{ paddingVertical: 2 }}
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
          >
            {description}
          </Text>
          <NativeText style={styles.tag}>{language}</NativeText>
        </View>
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.data}>
          <Text
            fontSize="subheading"
            fontWeight="bold"
            style={{ paddingBottom: 4 }}
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
          >
            {calculator(ratingAverage)}
          </Text>
          <Text color="textSecondary" style={{ paddingTop: 4 }}>
            Rating
          </Text>
        </View>
      </View>
    </View>
  );
}
