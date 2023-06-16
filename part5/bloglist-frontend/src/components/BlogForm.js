import Notification from './Notification';
import Blog from './Blog';
import Togglable from './Togglable';

function BlogForm({
  user,
  title,
  author,
  url,
  message,
  handleLogout,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  handleCreate,
  blogs,
}) {
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <div>
        {user.name}
        {' '}
        logged-in
        <button onClick={handleLogout} type="submit">logout</button>
      </div>
      <br />
      <h2>Create New</h2>
      <Togglable buttonLabel="create">
        <div>
          title:
          {' '}
          <input type="text" name="title" value={title} onChange={handleTitleChange} />
        </div>
        <div>
          author:
          {' '}
          <input type="text" name="author" value={author} onChange={handleAuthorChange} />
        </div>
        <div>
          url:
          {' '}
          <input type="URL" name="url" value={url} onChange={handleUrlChange} />
        </div>
        <div>
          <button type="submit" onClick={handleCreate}>create</button>
        </div>
      </Togglable>
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default BlogForm;
