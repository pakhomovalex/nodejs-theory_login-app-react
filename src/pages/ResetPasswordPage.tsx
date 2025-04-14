import { useState } from "react";
import { userService } from "../services/userService";
import { useNavigate, useParams } from "react-router-dom";

export const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { resetPasswordToken = '', email = '' } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password.length < 6) return 'At least 6 characters';

    if (password !== confirmPassword) {
      return 'The passwrods should be equal';
    }

    userService
      .resetPassword(email, resetPasswordToken, password)
      .then(() => {
        navigate('/login', {
            state: {
              from: location,
              replace: true,
            },
          });
      })
      .catch(err => {
        console.log('Smt went wrong', err)
      })
  };

  return (
    <>
      <h1 className="title">Write your new password</h1>
      <form 
        onSubmit={handleSubmit}
      >
        <h2>Write new password{`(At least 6 characters)`}</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <h2>Confirm your password</h2>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="submit">Reset Password</button>
      </form>
    </>
  );
};