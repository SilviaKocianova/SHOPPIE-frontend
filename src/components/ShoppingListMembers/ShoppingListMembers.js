import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ShoppingListMembers.css';

const ShoppingListMembers = ({ members, onAddMember, onRemoveMember }) => {
  const [newMember, setNewMember] = useState('');

  const handleAddMember = () => {
    if (newMember.trim() !== '') {
      onAddMember({ id: `member${Date.now()}`, name: newMember });
      setNewMember('');
    } else {
      alert('Member name cannot be empty');
    }
  };

  return (
    <div className="shopping-list-members">
      <h3>List Members</h3>
      <ul>
        {members.map(member => (
          <li key={member.id}>
            {member.name}
            <button onClick={() => onRemoveMember(member.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <div className="add-member-section">
        <input
          type="text"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
          placeholder="Enter new member name"
        />
        <button onClick={handleAddMember}>Add Member</button>
      </div>
    </div>
  );
};

ShoppingListMembers.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onAddMember: PropTypes.func.isRequired,
  onRemoveMember: PropTypes.func.isRequired,
};

export default ShoppingListMembers;
