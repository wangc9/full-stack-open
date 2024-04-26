import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import { Component, useState } from 'react';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.textSecondary,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

function SearchBar({ searchKeyword, setSearchKeyword }) {
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={setSearchKeyword}
      value={searchKeyword}
    />
  );
}

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

export class RepositoryListContainer extends Component {
  renderHeader = () => {
    const props = this.props;

    return (
      <>
        <SearchBar
          searchKeyword={props.searchKeyword}
          setSearchKeyword={props.setSearchKeyword}
        />
        <OrderPicker order={props.order} setOrder={props.setOrder} />
      </>
    );
  };

  render() {
    const props = this.props;
    const repositoryNodes = props.repositories
      ? props.repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
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
  }
}

const RepositoryList = () => {
  const [order, setOrder] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [value] = useDebounce(searchKeyword, 500);
  const { repositories } = useRepositories(order, value);
  const navigate = useNavigate();

  return (
    <RepositoryListContainer
      repositories={repositories}
      navigate={navigate}
      order={order}
      setOrder={setOrder}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  );
};

export default RepositoryList;
