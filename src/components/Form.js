import React from 'react';

const Form = ({
  username,
  setusername,
  password,
  setpassword,
  title,
  onSubmit,
}) => {
  return (
    <div className="auth-container">
      <form onSubmit={onSubmit}>
        <h2>{title}</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setusername(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setpassword(event.target.value)}
            required
          />
        </div>
        <button type="submit">{title}</button>
      </form>
    </div>
  );
};

export default Form;
