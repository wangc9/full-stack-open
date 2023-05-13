import axios from "axios";
const baseUrl = "https://fso-charles-phonebook.fly.dev/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`https://fso-charles-phonebook.fly.dev/api/person/${id}`);
  return request.then((response) => response);
};

const update = (id, newObject) => {
  const request = axios.put(`https://fso-charles-phonebook.fly.dev/api/person/${id}`, newObject);
  return request.then((response) => response.data);
};

export default { getAll, create, remove, update };
