import React from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [cookie, SetCookie] = useCookies(['access_token']);
  const navigate = useNavigate();
  const logout = () => {
    SetCookie('access_token', '');
    localStorage.removeItem('userId');
    navigate('/auth');
  };
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/create-recipe">Create Recipe</Link>

      {!cookie.access_token ? (
        <Link to="/auth">Login/Register</Link>
      ) : (
        <>
          <Link to="/saved-recipe">Saved Recipes</Link>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default Navbar;
