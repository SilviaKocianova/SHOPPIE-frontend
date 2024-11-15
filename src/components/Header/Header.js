import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ appName, user, onEditName }) => {
  const handleEdit = () => {
    const newName = prompt('Enter new name:');
    if (newName && newName.trim() !== '') {
      onEditName(newName);
    } else {
      alert('List name cannot be empty');
    }
  };

  return (
    <header className="header">
      <div className="header-title-section">
        <h1 className="header-title">{appName}</h1>
      </div>
    </header>
  );
};

Header.propTypes = {
  appName: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    isOwner: PropTypes.bool.isRequired,
  }).isRequired,
  onEditName: PropTypes.func.isRequired,
};

export default Header;
