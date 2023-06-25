import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { deleteBlog, likeBlog } from '../reducers/blogReducer';
import Comment from './Comment';

export function Blog({ user, blog }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLike = async () => {
    dispatch(likeBlog(blog));
  };
  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog));
      navigate('/blogs');
    }
  };

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <Link to={blog.url}>{blog.url}</Link>
      <div id="likes">
        likes {blog.likes}{' '}
        <Button
          id="like-button"
          type="button"
          variant="contained"
          color="primary"
          onClick={handleLike}
        >
          like
        </Button>
      </div>
      added by {blog.user.name}
      <br />
      {user.username === blog.user.username && (
        <Button
          id="delete-button"
          type="button"
          variant="contained"
          colot="warning"
          onClick={handleDelete}
        >
          <b>delete</b>
        </Button>
      )}
      <Comment blog={blog} />
    </div>
  );
}

function BlogList({ user }) {
  const blogs = useSelector((state) => state.blog);
  const sortBlogs = [...blogs];

  function compareLikes(blog1, blog2) {
    return blog2.likes - blog1.likes;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow key="title">
            <TableCell>
              <b>Title</b>
            </TableCell>
            <TableCell>
              <b>Author</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortBlogs.sort(compareLikes).map((blog) => (
            <TableRow key={blog.id}>
              <TableCell>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </TableCell>
              <TableCell>{blog.author}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BlogList;
