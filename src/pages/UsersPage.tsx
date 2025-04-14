import { useEffect, useState } from 'react';
import { usePageError } from '../hooks/usePageError';
import { userService } from '../services/userService';
import { User } from '../types/user';
import { AxiosError } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

export const UsersPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = usePageError('');
  const [user, setUser] = useState<User | null>(null);
  const [newName, setNewName] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [passwordForEmail, setPasswordForEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [isEmailChange, setIsEmailChange] = useState(false);

  if (isEmailChange) {
    return (
      <section className="">
        <h1 className="title">Check your email</h1>
        <p>We have sent you an email with the change email link</p>
      </section>
    );
  }

  const validatePassword = (value: string) => {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'At least 6 characters';
  };

  const changeName = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newName) return;

    userService.changeName(newName)
      .then(setUser)
      .catch(err => {
        console.log(err);
      })

    
  }

  const changePassword = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newPassword === confirmation ||
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      validatePassword(newPassword) ||
      validatePassword(oldPassword)) {
      return 'Check your values';
    }

    userService
      .changePassword(oldPassword, newPassword)
      .then(setUser)
      .catch(err => {
        console.log(err);
      })
  };

  const EMAIL_PATTERN = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  const emailSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!EMAIL_PATTERN.test(newEmail)) return 'Email is not valid';

    if (!user) return 'Unauthorized';

    userService
      .changeEmail(user.email, passwordForEmail, newEmail)
      .then(() => setIsEmailChange(true))
      .catch(err => {
        console.log(err);
      })
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    userService
      .getUser()
      .then(setUser)
      .catch((error: AxiosError) => {
        if (error.response?.status !== 401) {
          setError(error.message);
          return;
        }

        // await logout();

        // navigate('/login', {
        //   state: {
        //     from: location,
        //     replace: true,
        //   },
        // });
      })
  }, [location, logout, navigate, setError]);

  return (
    <div className="content">
      {user ? (<h1 className="title">{user.name}</h1>) :
        (<h1 className="title">User is undefiend</h1>)}

      <ul>
        {user && <li key={user.id}>{user.email} </li>}
      </ul>

      <form
        onSubmit={changeName}
      >
        <label htmlFor="name">Change name</label>
        <input
          type="text"
          id='name'
          value={newName}
          onChange={(e => setNewName(e.target.value))}
          required
        />
        <button type="submit">Change user name</button>
      </form>

      <h2>Change password</h2>
      <form
        onSubmit={changePassword}
      >
        <label htmlFor="old-password">Old password{`(At least 6 characters)`}</label>
        <input
          type="text"
          id='old-password'
          value={oldPassword}
          onChange={(e => setOldPassword(e.target.value))}
          required
        />
        <label htmlFor="new-password">New password{`(At least 6 characters)`}</label>
        <input
          type="text"
          id='new-password'
          value={newPassword}
          onChange={(e => setNewPassword(e.target.value))}
          required
        />
        <label htmlFor="new-password">Confirm new password</label>
        <input
          type="text"
          id='new-password'
          value={confirmation}
          onChange={(e => setConfirmation(e.target.value))}
          required
        />
        <button type="submit">Change password</button>
      </form>

      <h2>If you want to change email confirm your password below and write a new email</h2>
      <form
        onSubmit={emailSubmit}
      >
        <input
          type="password"
          placeholder='*******'
          value={passwordForEmail}
          onChange={(e) => setPasswordForEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder='test123@test.email'
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          required
        />
        <button type='submit'>Check password and send activation list</button>
      </form>

      {error && <p className="notification is-danger is-light">{error}</p>}
    </div>
  );
};
