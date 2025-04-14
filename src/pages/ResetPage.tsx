import { useState } from "react";
import { userService } from "../services/userService";

export const ResetPage = () => {
  const [email, setEmail] = useState('');

  const EMAIL_PATTERN = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  function validateEmail(value: string) {
    if (!value) return 'Email is required';
    if (!EMAIL_PATTERN.test(value)) return 'Email is not valid';
  }

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    validateEmail(email);

    userService.resetPasswordRequest(email).then(

    ).catch(err => {
      console.log(err);
    });
  };

  return (
    <>
      <h1 className="title">Reset password</h1>
      <form
        onSubmit={handleSubmit}
      >
        <label htmlFor="email">
          Write your email
        </label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Send email</button>
      </form>
    </>
  );
};