import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button, TextField } from '@mui/material';
import { useField } from '../hooks';
import { createBlog } from '../reducers/blogReducer';

function BlogForm({ user }) {
  const dispatch = useDispatch();
  const title = useField('text', 'title');
  const author = useField('text', 'author');
  const url = useField('URL', 'url');

  const handleCreate = async (event) => {
    event.preventDefault();
    const blog = {
      title: title.value,
      author: author.value,
      url: url.value,
      user: user.id,
    };
    dispatch(createBlog(blog));
    title.clearValue();
    author.clearValue();
    url.clearValue();
  };
  return (
    <form onSubmit={handleCreate}>
      <div>
        <TextField
          label={title.name}
          id={title.id}
          name={title.name}
          value={title.value}
          onChange={title.onChange}
        />
      </div>
      <div>
        <TextField
          label={author.name}
          id={author.id}
          name={author.name}
          value={author.value}
          onChange={author.onChange}
        />
      </div>
      <div>
        <TextField
          label={url.name}
          id={url.id}
          name={url.name}
          value={url.value}
          onChange={url.onChange}
        />
      </div>
      <div>
        <Button
          id="create-button"
          type="submit"
          variant="contained"
          color="primary"
        >
          create
        </Button>
      </div>
    </form>
  );
}

BlogForm.prototype = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
