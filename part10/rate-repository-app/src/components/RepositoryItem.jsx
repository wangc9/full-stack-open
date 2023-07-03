import Card from './Card';

const RepositoryItem = ({item}) => {
  return (
    <Card item={item} inList={true} />
  );
};

export default RepositoryItem;