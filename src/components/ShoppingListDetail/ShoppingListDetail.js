import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ShoppingListDetail.css';
import unresolvedSvg from '../img/unresolved.svg';


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
      <div className="shopping-list-detail-box">
      <div className="title-and-edit">
      <h2 className="list-title">{list.name}</h2>

            {/* Render the edit button only if the user is the owner */}
            {user?.isOwner && (
        <button className="edit-button" onClick={handleEdit}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5" width="20" height="20">
  <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
</svg>

        </button>
      )}

      </div>
      {user && <p className="list-owner">Owner: {user.name}</p>}
      


      

<ul className="shopping-list">
  {list.items.map(item => (
    <li key={item.id} className={`shopping-list-item ${item.resolved ? 'resolved' : ''}`}>
      {item.name}
      <button class="resolve-unresolve" onClick={() => onMarkAsResolved(item.id)}>
        {item.resolved ? 'Unresolve' : (
          <img src={unresolvedSvg} alt="Unresolved" width="20" height="20" />
        )}
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
