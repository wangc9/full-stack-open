import {StyleSheet, View} from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'stretch',
    backgroundColor: '#eeeeee',
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    backgroundColor: '#eeeeee',
    borderColor: theme.colors.primary,
    borderStyle: 'solid',
    borderWidth: 2,
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
    paddingVertical: 13,
    textAlign: 'center',
  },
  avatarContainer: {
    flexGrow: 0,
    // justifyContent: 'center',
    paddingRight: 15,
  },
  infoContainer: {
    flexGrow: 1,
    alignItems: 'flex-start',
    flexShrink: 1,
  },
  bodyContainer: {
    paddingVertical: 15,
  },
  itemContainer: {
    flexGrow: 1,
  },
  dataContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-evenly',
  },
})

const ReviewCard = ({item}) => {
  console.log('item', item);
  return (
    <View testID="cardItem" style={styles.cardContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>{item.rating}</Text>
        </View>
        <View testID="info" style={styles.infoContainer}>
          <Text fontWeight='bold'>{item.user.username}</Text>
          <Text color='textSecondary'>{item.createdAt.slice(0, 10)}</Text>
          <Text>{item.text}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReviewCard;
