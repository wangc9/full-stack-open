import { FlatList } from 'react-native';
import useSelf from '../hooks/useSelf';
import { ItemSeparator } from './RepositoryItem';
import ReviewCard from './ReviewCard';

export default function MyReviews() {
  const { data } = useSelf(true);
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <ReviewCard review={item.node} />}
      ItemSeparatorComponent={<ItemSeparator />}
    />
  );
}
