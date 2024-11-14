import React from 'react';
import PropTypes from 'prop-types';
import './ShoppingListDetail.css';

const ShoppingListDetail = ({ list, onAddItem, onRemoveItem, onMarkAsResolved }) => {
  return (
    <div className="shopping-list-detail">
      <ul>
        {list.items.map(item => (
          <li key={item.id} className={item.resolved ? 'resolved' : ''}>
            {item.name}
            <button onClick={() => onMarkAsResolved(item.id)}>Mark as {item.resolved ? 'Unresolved' : 'Resolved'}</button>
            <button onClick={() => onRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={() => {
        const newItem = prompt('Enter new item:');
        if (newItem) onAddItem(newItem);
      }}>Add Item</button>
    </div>
  );
};

ShoppingListDetail.propTypes = {
  list: PropTypes.object.isRequired,
  onAddItem: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onMarkAsResolved: PropTypes.func.isRequired,
};

export default ShoppingListDetail;
