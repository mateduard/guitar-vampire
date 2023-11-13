import './favorites.styles.scss';

import { useContext } from 'react';

import { FavoritesContext } from '../../contexts/favorites.context';

import FavoriteCard from '../../components/favorite-card/favorite-card.component';
import Button from '../../components/button/button.component';

const Favorites = () => {
  const { favoriteItems, removeItemFromFavorites, clearFavoriteItems } =
    useContext(FavoritesContext);
  // console.log(favoriteItems);

  const clearFavoriteList = () => clearFavoriteItems();


  return favoriteItems.length > 0 ? (
    <div className="favorites-container">
      <div className="titles">
        <span>Preview</span>
        <span>Name</span>
        <span>Model</span>
        <span>Price</span>
        <span>Remove</span>
      </div>
      {favoriteItems.map((item) => {
        const removeGuitarFromFavorites = () => {
          // console.log('removed');
          return removeItemFromFavorites(item);
        };
        return (
          <FavoriteCard
            item={item}
            remFct={removeGuitarFromFavorites}
            key={item._id}
          />
        );
      })}
      <Button classList={'clear-btn'} actionOnClick={clearFavoriteList} >
        <span>&#128465;</span> Clear List
      </Button>
    </div>
  ) : (
    <div className="favorites-container">
      <p id="empty-favorites-text">It's a bit quiet here...</p>
    </div>
  );
};

export default Favorites;
