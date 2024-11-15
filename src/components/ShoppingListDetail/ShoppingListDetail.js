import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ShoppingListDetail.css';

const ShoppingListDetail = ({ list, onAddItem, onRemoveItem, onMarkAsResolved }) => {
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    if (newItem.trim() !== '') {
      onAddItem({ id: `item${Date.now()}`, name: newItem, resolved: false });
      setNewItem('');
    } else {
      alert('Item name cannot be empty');
    }
  };

  return (
    <div className="shopping-list-detail">
      <h2>{list.name}</h2>
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
  onAddItem: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onMarkAsResolved: PropTypes.func.isRequired,
};

export default ShoppingListDetail;
