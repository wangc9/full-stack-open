import {Image, StyleSheet, View} from 'react-native';
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
  },
  avatarContainer: {
    flexGrow: 0,
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

const Card = ({item}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.avatarContainer}>
          <Image source={{uri: item.ownerAvatarUrl}} style={styles.avatar} />
        </View>
        <View style={styles.infoContainer}>
          <Text fontWeight='bold'>{item.fullName}</Text>
          <Text color='textSecondary'>{item.description}</Text>
          <Text style={{color: '#eeeeee', backgroundColor: theme.colors.primary, padding: 5, justifyContent: 'flex-start'}}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.dataContainer}>
          <View style={styles.itemContainer}>
            <Text fontWeight='bold'>{(Number(item.stargazersCount)/1000).toFixed(1)}k</Text>
            <Text color='textSecondary'>Stars</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text fontWeight='bold'>{(Number(item.forksCount)/1000).toFixed(1)}k</Text>
            <Text color='textSecondary'>Forks</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text fontWeight='bold'>{item.reviewCount}</Text>
            <Text color='textSecondary'>Reviews</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text fontWeight='bold'>{item.ratingAverage}</Text>
            <Text color='textSecondary'>Rating</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Card;
