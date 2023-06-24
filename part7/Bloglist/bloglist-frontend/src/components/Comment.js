import { useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks';
import { commentBlog } from '../reducers/blogReducer';

function Comment({ blog }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const comment = useField('text', 'comment');
  const comments = blog.comments;
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(commentBlog(blog, comment.value));
    comment.clearValue();
    navigate(`/blogs/${blog.id}`);
  };

  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={handleSubmit}>
        <input
          id={comment.id}
          value={comment.value}
          name={comment.name}
          type={comment.type}
          onChange={comment.onChange}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  );
}

export default Comment;
