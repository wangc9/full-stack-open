import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newBlog, config);

  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);

  return response.data;
};

const update = async (oldBlog) => {
  const updatedBlog = {
    likes: oldBlog.likes + 1,
  };

  const response = await axios.put(`${baseUrl}/${oldBlog.id}`, updatedBlog);

  return response.data;
};

const comment = async (oldBlog, comment) => {
  const updatedBlog = {
    comments: comment,
  };

  const response = await axios.post(
    `${baseUrl}/${oldBlog.id}/comments`,
    updatedBlog
  );

  return response.data;
};

const blogService = {
  getAll,
  create,
  setToken,
  remove,
  update,
  comment,
};

export default blogService;
