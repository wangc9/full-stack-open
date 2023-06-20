import {useDispatch} from 'react-redux';
import {addFilter} from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault();
    const content = event.target.value;
    dispatch(addFilter(content));
  };

  return (
      <div>
        filter
        <input name="filter" onChange={handleChange}/>
      </div>
  );
};

export default Filter;