import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ currentUser, members, onUserChange }) => {
  return (
    <header className="app-header">
      <h1>Shopping List App</h1>
      <select
        className="member-select"
        value={currentUser?.id || ''}
        onChange={(e) => onUserChange(e.target.value)}
      >
        {members.map((member) => (
          <option key={member.id} value={member.id}>
            {member.name}
          </option>
        ))}
      </select>
    </header>
  );
};

Header.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onUserChange: PropTypes.func.isRequired,
};

export default Header;
