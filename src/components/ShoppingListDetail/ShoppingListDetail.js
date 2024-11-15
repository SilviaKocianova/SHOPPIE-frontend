import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ShoppingListDetail.css';

const ShoppingListDetail = ({ list, user, onAddItem, onRemoveItem, onMarkAsResolved, onEditName }) => {
  const [newItem, setNewItem] = useState('');

  // Handles adding a new item to the list
  const handleAddItem = () => {
    if (newItem.trim() !== '') {
      onAddItem({ id: `item${Date.now()}`, name: newItem, resolved: false });
      setNewItem('');
    } else {
      alert('Item name cannot be empty');
    }
  };

  // Handles editing the shopping list name
  const handleEdit = () => {
    const newName = prompt('Enter new name:');
    if (newName && newName.trim() !== '') {
      onEditName(newName);
    } else {
      alert('List name cannot be empty');
    }
  };

  return (
    <div className="shopping-list-detail">
      <h2 className="list-title">{list.name}</h2>
      {user && <p className="list-owner">Owner: {user.name}</p>}

      {/* Render the edit button only if the user is the owner */}
      {user?.isOwner && (
        <button className="edit-button" onClick={handleEdit}>
          Edit Name
        </button>
      )}

      <ul className="shopping-list">
        {list.items.map(item => (
          <li key={item.id} className={`shopping-list-item ${item.resolved ? 'resolved' : ''}`}>
            {item.name}
            <button onClick={() => onMarkAsResolved(item.id)}>
              {item.resolved ? 'Unresolve' : 'Resolve'}
            </button>
            <button onClick={() => onRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>

      <div className="add-item-section">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter new item"
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
    </div>
  );
};

ShoppingListDetail.propTypes = {
  list: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        resolved: PropTypes.bool.isRequired,
      })
    ).isRequired,
  }).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    isOwner: PropTypes.bool.isRequired,
  }).isRequired,
  onAddItem: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onMarkAsResolved: PropTypes.func.isRequired,
  onEditName: PropTypes.func.isRequired,
};

export default ShoppingListDetail;
