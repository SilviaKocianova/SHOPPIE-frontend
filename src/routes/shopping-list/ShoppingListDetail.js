import React, { useState } from 'react';
import Header from '../components/Header';
import ShoppingListDetail from '../components/ShoppingListDetail';
import ShoppingListMembers from '../components/ShoppingListMembers';
import { MOCK_SHOPPING_LIST } from '../data/mockData';

const ShoppingListPage = () => {
  const [list, setList] = useState(MOCK_SHOPPING_LIST);

  const handleAddItem = (itemName) => {
    const newItem = { id: `item${Date.now()}`, name: itemName, resolved: false };
    setList({ ...list, items: [...list.items, newItem] });
  };

  const handleRemoveItem = (itemId) => {
    setList({ ...list, items: list.items.filter(item => item.id !== itemId) });
  };

  const handleMarkAsResolved = (itemId) => {
    setList({
      ...list,
      items: list.items.map(item =>
        item.id === itemId ? { ...item, resolved: !item.resolved } : item
      ),
    });
  };

  const handleAddMember = (memberName) => {
    const newMember = { id: `member${Date.now()}`, name: memberName };
    setList({ ...list, members: [...list.members, newMember] });
  };

  const handleRemoveMember = (memberId) => {
    setList({ ...list, members: list.members.filter(member => member.id !== memberId) });
  };

  return (
    <div>
      <Header user={list.owner} shoppingListName={list.name} onEditName={(newName) => setList({ ...list, name: newName })} />
      <ShoppingListDetail 
        list={list} 
        onAddItem={handleAddItem} 
        onRemoveItem={handleRemoveItem} 
        onMarkAsResolved={handleMarkAsResolved} 
      />
      <ShoppingListMembers 
        members={list.members} 
        onAddMember={handleAddMember} 
        onRemoveMember={handleRemoveMember} 
      />
    </div>
  );
};

export default ShoppingListPage;