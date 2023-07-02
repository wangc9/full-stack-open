import {FlatList, StyleSheet, View} from 'react-native';
import RepositoryItem from './RepositoryItem';
import Constants from 'expo-constants';
import theme from '../theme';
import {useQuery} from '@apollo/client';
import {GET_REPOSITORIES} from '../graphql/Query';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
  background: {
    backgroundColor: theme.colors.mainBackground
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const {data, error, loading} = useQuery(GET_REPOSITORIES);

  const repositoryNodes = data ? data.repositories.edges.map(edge => edge.node) : [];

  return (
    <View style={{marginBottom: 70,}}>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) => <RepositoryItem item={item} /> }
        keyExtractor={item => item.id}
        style={styles.background}
        // other props
      />
    </View>
  );
};

export default RepositoryList;