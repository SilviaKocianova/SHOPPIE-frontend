import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ShoppingListDetail.css';
import unresolvedSvg from '../img/unresolved.svg';
import resolvedSvg from '../img/resolved.svg';
import ShoppingListMembers from '../ShoppingListMembers/ShoppingListMembers';

const ShoppingListDetail = ({ list, user, members, onAddItem, onRemoveItem, onMarkAsResolved, onEditName, onAddMember, onRemoveMember }) => {
  const [newItem, setNewItem] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const handleAddItem = () => {
    if (newItem.trim() !== '') {
      onAddItem({ id: `item${Date.now()}`, name: newItem, resolved: false });
      setNewItem('');
    } else {
      alert('Item name cannot be empty');
    }
  };

  const handleEdit = () => {
    const newName = prompt('Enter new name:');
    if (newName && newName.trim() !== '') {
      onEditName(newName);
    } else {
      alert('List name cannot be empty');
    }
  };

  const handleLeaveList = () => {
    alert(`${user.name} has left the list`);
  };

  const filteredItems = list.items.filter(item => {
    if (filter === 'unresolved') return !item.resolved;
    if (filter === 'resolved') return item.resolved;
    return true; // 'all' filter
  });

  return (
    <div className="shopping-list-detail">
      <div className="shopping-list-detail-box">
        <div className="title-and-edit">
          <h2 className="list-title">{list.name}</h2>
          <select
            className="filter-dropdown"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Show All Items</option>
            <option value="unresolved">Show Only Unresolved Items</option>
            <option value="resolved">Show Only Resolved Items</option>
          </select>
          {user?.isOwner && (
            <button className="edit-button" onClick={handleEdit}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5" width="20" height="20">
                <path d="M2.695 14.762l-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
              </svg>
            </button>
          )}
          <button className="manage-members-button" onClick={() => setIsModalOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
            </svg>
          </button>
        </div>

        {user && <p className="list-owner">Owner: {user.name}</p>}

        <ul className="shopping-list">
          {filteredItems.map(item => (
            <li key={item.id} className={`shopping-list-item ${item.resolved ? 'resolved' : ''}`}>
              <button className="resolve-unresolve" onClick={() => onMarkAsResolved(item.id)}>
                {item.resolved ? (
                  <img src={resolvedSvg} className="item-resolved" alt="Resolved" width="20" height="20" />
                ) : (
                  <img src={unresolvedSvg} className="item-unresolved" alt="Unresolved" width="20" height="20" />
                )}
              </button>
              {item.name}
              <button className="remove-item-from-list" onClick={() => onRemoveItem(item.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </button>
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

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-modal" onClick={() => setIsModalOpen(false)}>✖</button>
              <ShoppingListMembers
                members={members}
                onAddMember={onAddMember}
                onRemoveMember={onRemoveMember} // Pass down remove member handler here
              />
              {!user?.isOwner && (
                <button className="leave-list-button" onClick={handleLeaveList}>
                  Leave List
                </button>
              )}
            </div>
          </div>
        )}
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
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onAddItem: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onMarkAsResolved: PropTypes.func.isRequired,
  onEditName: PropTypes.func.isRequired,
  onAddMember: PropTypes.func.isRequired,
  onRemoveMember: PropTypes.func.isRequired, // Add prop type for remove member
};

export default ShoppingListDetail;
