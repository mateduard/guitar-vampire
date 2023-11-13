import { createContext, useState } from 'react';

const addFavoriteItem = (favoriteItems, itemToAdd) => {
  const existingFavoriteItem = favoriteItems.find(
    (item) => itemToAdd._id === item._id
  );

  if (existingFavoriteItem) {
    alert('The item is already in the list!');
    return favoriteItems;
  }

  return [itemToAdd, ...favoriteItems];
};

const removeFavoriteItem = (favoriteItems, itemToRemove) => {
  return favoriteItems.filter((item) => itemToRemove._id !== item._id);
};

export const FavoritesContext = createContext({
  favoriteItems: [],
  addItemToFavorites: () => {},
  removeItemFromFavorites: () => {},
  clearFavoriteItems: () => {},
});

export const FavoritesProvider = ({children}) => {
  const [favoriteItems, setFavoriteItems] = useState([]);

  const addItemToFavorites = (productToAdd) => {
    setFavoriteItems(addFavoriteItem(favoriteItems, productToAdd));
  };

  const removeItemFromFavorites = (productToRemove) => {
    setFavoriteItems(removeFavoriteItem(favoriteItems, productToRemove));
  };

  const clearFavoriteItems = () => {
    setFavoriteItems([]);
  };

  const value = {
    favoriteItems,
    addItemToFavorites,
    removeItemFromFavorites,
    clearFavoriteItems,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
