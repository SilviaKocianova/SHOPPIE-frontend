import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ user, shoppingListName, onEditName }) => {
  const handleEdit = () => {
    const newName = prompt('Enter new name:');
    if (newName && newName.trim() !== '') {
      onEditName(newName);
    }
  };

  return (
    <header className="header">
      <div className="header-title-section">
        <h1 className="header-title">{shoppingListName}</h1>
        {user && user.isOwner && (
          <button className="edit-button" onClick={handleEdit}>
            Edit Name
          </button>
        )}
      </div>
      {user && <p className="header-user-info">Owner: {user.name}</p>}
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    isOwner: PropTypes.bool.isRequired, // Indicate if the user is the owner
  }).isRequired,
  shoppingListName: PropTypes.string.isRequired,
  onEditName: PropTypes.func.isRequired,
};

export default Header;
