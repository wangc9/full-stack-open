import { useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
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
        <TextField
          label={comment.name}
          id={comment.id}
          value={comment.value}
          name={comment.name}
          onChange={comment.onChange}
        />
        <br />
        <Button
          type="submit"
          id="comment-button"
          variant="contained"
          color="primary"
        >
          <b>add comment</b>
        </Button>
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
