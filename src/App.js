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
  const [user, setUser] = useState({ name: 'John Doe', isOwner: true });

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

  return (
    <div className="App">
      <Header user={user} shoppingListName={shoppingList.name} onEditName={handleEditName} />
      <ShoppingListDetail
        list={shoppingList}
        onAddItem={handleAddItem}
        onRemoveItem={handleRemoveItem}
        onMarkAsResolved={handleMarkAsResolved}
      />
    </div>
  );
}

export default App;
