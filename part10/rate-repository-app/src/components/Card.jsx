import {
  Button,
  FlatList,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import Text from './Text';
import theme from '../theme';
import {useNavigate, useParams} from 'react-router-native';
import {useQuery} from '@apollo/client';
import {GET_REPO} from '../graphql/Query';
import ReviewCard from './ReviewCard';

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

const Card = ({item, inList}) => {
  const {id} = useParams();
  const navigate = useNavigate();
  const {data, error, loading} = useQuery(GET_REPO, {
    variables: {
      repositoryId: id
    },
    skip: id === null,
    fetchPolicy: 'cache-and-network',
  });
  if (loading) {
    return (<><Text>Loading</Text></>)
  }
  const reviews = data ? data.repository.reviews.edges.map(edge => edge.node) : [];
  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <>
      {inList ? (
        <Pressable onPress={() => {navigate(`/repositories/${item.id}`)}}>
          <View testID="cardItem" style={styles.cardContainer}>
            <View style={styles.headerContainer}>
              <View style={styles.avatarContainer}>
                <Image source={{uri: item.ownerAvatarUrl}} style={styles.avatar} />
              </View>
              <View testID="info" style={styles.infoContainer}>
                <Text fontWeight='bold'>{item.fullName}</Text>
                <Text color='textSecondary'>{item.description}</Text>
                <Text style={{color: '#eeeeee', backgroundColor: theme.colors.primary, padding: 5, justifyContent: 'flex-start'}}>{item.language}</Text>
              </View>
            </View>
            <View style={styles.bodyContainer}>
              <View style={styles.dataContainer}>
                <View testID="stars" style={styles.itemContainer}>
                  <Text fontWeight='bold'>{(Number(item.stargazersCount)/1000).toFixed(1)}k</Text>
                  <Text color='textSecondary'>Stars</Text>
                </View>
                <View testID="forks" style={styles.itemContainer}>
                  <Text fontWeight='bold'>{(Number(item.forksCount)/1000).toFixed(1)}k</Text>
                  <Text color='textSecondary'>Forks</Text>
                </View>
                <View testID="reviews" style={styles.itemContainer}>
                  <Text fontWeight='bold'>{item.reviewCount}</Text>
                  <Text color='textSecondary'>Reviews</Text>
                </View>
                <View testID="rating" style={styles.itemContainer}>
                  <Text fontWeight='bold'>{item.ratingAverage}</Text>
                  <Text color='textSecondary'>Rating</Text>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
        ) : (
          <>
            <View testID="cardItem" style={styles.cardContainer}>
              <View style={styles.headerContainer}>
                <View style={styles.avatarContainer}>
                  <Image source={{uri: data.repository.ownerAvatarUrl}} style={styles.avatar} />
                </View>
                <View testID="info" style={styles.infoContainer}>
                  <Text fontWeight='bold'>{data.repository.fullName}</Text>
                  <Text color='textSecondary'>{data.repository.description}</Text>
                  <Text style={{color: '#eeeeee', backgroundColor: theme.colors.primary, padding: 5, justifyContent: 'flex-start'}}>{data.repository.language}</Text>
                </View>
              </View>
              <View style={styles.bodyContainer}>
                <View style={styles.dataContainer}>
                  <View testID="stars" style={styles.itemContainer}>
                    <Text fontWeight='bold'>{(Number(data.repository.stargazersCount)/1000).toFixed(1)}k</Text>
                    <Text color='textSecondary'>Stars</Text>
                  </View>
                  <View testID="forks" style={styles.itemContainer}>
                    <Text fontWeight='bold'>{(Number(data.repository.forksCount)/1000).toFixed(1)}k</Text>
                    <Text color='textSecondary'>Forks</Text>
                  </View>
                  <View testID="reviews" style={styles.itemContainer}>
                    <Text fontWeight='bold'>{data.repository.reviewCount}</Text>
                    <Text color='textSecondary'>Reviews</Text>
                  </View>
                  <View testID="rating" style={styles.itemContainer}>
                    <Text fontWeight='bold'>{data.repository.ratingAverage}</Text>
                    <Text color='textSecondary'>Rating</Text>
                  </View>
                </View>
              </View>
              <Button title='Open in Github' onPress={() => {Linking.openURL(data.repository.url)}} />
            </View>
            <FlatList
              data={reviews}
              ItemSeparatorComponent={ItemSeparator}
              keyExtractor={item => item.id}
              style={{backgroundColor: theme.colors.mainBackground}}
              renderItem={({item}) => <ReviewCard item={item}/>}
            />
          </>
      )}
    </>

  );
};

export default Card;
