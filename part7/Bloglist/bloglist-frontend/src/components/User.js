function User({ user }) {
  console.log(user);
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul key="user-blogs">
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default User;
