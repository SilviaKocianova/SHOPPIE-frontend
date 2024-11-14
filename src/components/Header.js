import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ user, shoppingListName, onEditName }) => {
  return (
    <header className="header">
      <h1>{shoppingListName}</h1>
      {user && <p>Owner: {user.name}</p>}
      <button onClick={() => onEditName(prompt('Enter new name:'))}>Edit Name</button>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.object.isRequired,
  shoppingListName: PropTypes.string.isRequired,
  onEditName: PropTypes.func.isRequired,
};

export default Header;
