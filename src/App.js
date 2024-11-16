import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import ShoppingListDetail from './components/ShoppingListDetail/ShoppingListDetail';

function App() {
  const initialList = {
    id: 'list1',
    name: 'Grocery Shopping',
    items: [
      { id: 'item1', name: 'Apples', resolved: false },
      { id: 'item2', name: 'Bread', resolved: true },
      { id: 'item3', name: 'Milk', resolved: false },
    ],
  };

  const [shoppingList, setShoppingList] = useState(initialList);
  const [members, setMembers] = useState([
    { id: 'member1', name: 'Petr Novak' },
    { id: 'member2', name: 'Anna Smith' },
  ]);
  const [currentUser, setCurrentUser] = useState(members[0]);

  const handleUserChange = (memberId) => {
    const selectedMember = members.find((member) => member.id === memberId);
    setCurrentUser(selectedMember);
  };

  const handleEditName = (newName) => {
    if (currentUser.isOwner) {
      setShoppingList({ ...shoppingList, name: newName });
    } else {
      alert('Only the owner can edit the name of the shopping list.');
    }
  };

  const handleAddItem = (newItem) => {
    setShoppingList({
      ...shoppingList,
      items: [...shoppingList.items, { ...newItem, resolved: false }],
    });
  };

  const handleRemoveItem = (itemId) => {
    setShoppingList({
      ...shoppingList,
      items: shoppingList.items.filter((item) => item.id !== itemId),
    });
  };

  const handleMarkAsResolved = (itemId) => {
    setShoppingList({
      ...shoppingList,
      items: shoppingList.items.map((item) =>
        item.id === itemId ? { ...item, resolved: !item.resolved } : item
      ),
    });
  };

  const handleAddMember = (newMember) => {
    setMembers([...members, newMember]);
  };

  const handleRemoveMember = (memberId) => {
    setMembers(members.filter((member) => member.id !== memberId));
  };

  return (
    <div className="App">
      <Header user={currentUser} onUserChange={handleUserChange} members={members} />
      <ShoppingListDetail
        list={shoppingList}
        user={currentUser}
        members={members}
        onAddItem={handleAddItem}
        onRemoveItem={handleRemoveItem}
        onMarkAsResolved={handleMarkAsResolved}
        onEditName={handleEditName}
        onAddMember={handleAddMember}
        onRemoveMember={handleRemoveMember}
      />
    </div>
  );
}

export default App;
