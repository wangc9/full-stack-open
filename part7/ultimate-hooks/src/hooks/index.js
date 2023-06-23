import {useState} from 'react';
import axios from 'axios';

export const useResource = (baseUrl) => {
  let token = null;

  const [value, setValue] = useState([]);

  const getAll = async () => {
    const response = await axios.get(baseUrl);
    setValue(response.data);
  };

  const create = async (newObject) => {
    const config = {
      headers: {Authorization: token}
    };

    const response = await axios.post(baseUrl, newObject, config);

    setValue([...value, response.data]);
  };

  const service = {
    getAll,
    create,
  }

  return [value, service];
};
