import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import userService from '../services/users';

function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function initUser() {
      const response = await userService.getAll();
      setUsers(response);
    }
    initUser();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <br />
      <table>
        <thead>
          <tr key="user-head">
            <th> </th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
