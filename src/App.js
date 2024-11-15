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

  const appName = "SH☻PPIE.";

  return (
    <div className="App">
      <Header appName={appName} onEditName={handleEditName} />
      <ShoppingListDetail
        list={shoppingList}
        user={user} // Pass user to ShoppingListDetail
        onAddItem={handleAddItem}
        onRemoveItem={handleRemoveItem}
        onMarkAsResolved={handleMarkAsResolved}
        onEditName={handleEditName}
      />
    </div>
  );
}

export default App;
