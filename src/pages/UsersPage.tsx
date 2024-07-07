import { useEffect, useState } from 'react';
import { usePageError } from '../hooks/usePageError';
import { userService } from '../services/userService';
import { User } from '../types/user';
import { AxiosError } from 'axios';

export const UsersPage = () => {
  const [error, setError] = usePageError('');
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    userService
      .getAll()
      .then(setUsers)
      .catch((error: AxiosError) => {
        setError(error.message);
      });
  }, []);

  return (
    <div className="content">
      <h1 className="title">Users</h1>

      <ul>
        {users.map(user => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>

      {error && <p className="notification is-danger is-light">{error}</p>}
    </div>
  );
};
