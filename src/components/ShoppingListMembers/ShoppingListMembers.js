import React from 'react';
import PropTypes from 'prop-types';
import './ShoppingListMembers.css';

const ShoppingListMembers = ({ members, onAddMember, onRemoveMember }) => {
  return (
    <div className="shopping-list-members">
      <ul>
        {members.map(member => (
          <li key={member.id}>
            {member.name}
            <button onClick={() => onRemoveMember(member.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={() => {
        const newMember = prompt('Enter new member name:');
        if (newMember) onAddMember(newMember);
      }}>Add Member</button>
    </div>
  );
};

ShoppingListMembers.propTypes = {
  members: PropTypes.array.isRequired,
  onAddMember: PropTypes.func.isRequired,
  onRemoveMember: PropTypes.func.isRequired,
};

export default ShoppingListMembers;
