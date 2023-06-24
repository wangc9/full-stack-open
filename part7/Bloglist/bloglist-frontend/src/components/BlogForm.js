import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
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
    <div>
      <div>
        title:{' '}
        <input
          id={title.id}
          type={title.type}
          name={title.name}
          value={title.value}
          onChange={title.onChange}
        />
      </div>
      <div>
        author:{' '}
        <input
          id={author.id}
          type={author.type}
          name={author.name}
          value={author.value}
          onChange={author.onChange}
        />
      </div>
      <div>
        url:{' '}
        <input
          id={url.id}
          type={url.type}
          name={url.name}
          value={url.value}
          onChange={url.onChange}
        />
      </div>
      <div>
        <button id="create-button" type="submit" onClick={handleCreate}>
          create
        </button>
      </div>
    </div>
  );
}

BlogForm.prototype = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
