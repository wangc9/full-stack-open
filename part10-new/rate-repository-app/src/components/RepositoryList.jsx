import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import { useState } from 'react';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.textSecondary,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

function OrderPicker({ order, setOrder }) {
  return (
    <Picker
      selectedValue={order}
      onValueChange={(itemValue, itemIndex) => {
        setOrder(itemValue);
      }}
    >
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  );
}

export const RepositoryListContainer = ({
  navigate,
  repositories,
  order,
  setOrder,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={<OrderPicker order={order} setOrder={setOrder} />}
      renderItem={(item) => (
        <Pressable
          onPress={() => {
            const id = item.item.id;
            navigate(`/${id}`);
          }}
        >
          <RepositoryItem props={item.item} />
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const [order, setOrder] = useState('latest');
  const { repositories } = useRepositories(order);
  const navigate = useNavigate();

  return (
    <RepositoryListContainer
      repositories={repositories}
      navigate={navigate}
      order={order}
      setOrder={setOrder}
    />
  );
};

export default RepositoryList;
