import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header.js';
import ShoppingListDetail from './components/ShoppingListDetail/ShoppingListDetail.js';

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
  const [user, setUser] = useState({ name: 'Petr Novak', isOwner: true });
  const [members, setMembers] = useState([
    { id: 'member1', name: 'Petr Novak' },
    { id: 'member2', name: 'Anna Smith' },
  ]);

  const handleEditName = (newName) => {
    setShoppingList({ ...shoppingList, name: newName });
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
      items: shoppingList.items.filter(item => item.id !== itemId),
    });
  };

  const handleMarkAsResolved = (itemId) => {
    setShoppingList({
      ...shoppingList,
      items: shoppingList.items.map(item =>
        item.id === itemId ? { ...item, resolved: !item.resolved } : item
      ),
    });
  };

  const handleAddMember = (newMemberName) => {
    const newMember = {
      id: `member${Date.now()}`,
      name: newMemberName,
    };
    setMembers([...members, newMember]);
  };

  const handleRemoveMember = (memberId) => {
    setMembers(members.filter(member => member.id !== memberId));
  };

  const appName = "SH☻PPIE.";

  return (
    <div className="App">
      <Header appName={appName} user={user} onEditName={handleEditName} />
      <ShoppingListDetail
        list={shoppingList}
        user={user}
        members={members}
        onAddItem={handleAddItem}
        onRemoveItem={handleRemoveItem}
        onMarkAsResolved={handleMarkAsResolved}
        onEditName={handleEditName}
        onAddMember={handleAddMember}
        onRemoveMember={handleRemoveMember} // Pass remove member handler here
      />
    </div>
  );
}

export default App;
