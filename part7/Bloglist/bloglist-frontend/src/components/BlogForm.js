import { useState } from 'react';
import PropTypes from 'prop-types';

function BlogForm({ createBlog }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreate = async (event) => {
    event.preventDefault();
    const blog = { title: title, author: author, url: url };
    await createBlog(blog);
    setAuthor('');
    setTitle('');
    setUrl('');
  };
  return (
    <div>
      <div>
        title:{' '}
        <input
          id="title"
          type="text"
          name="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:{' '}
        <input
          id="author"
          type="text"
          name="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:{' '}
        <input
          id="url"
          type="URL"
          name="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
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
