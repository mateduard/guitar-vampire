import { useContext } from 'react';
import { FavoritesContext } from '../../contexts/favorites.context';

import Button from '../button/button.component';

import './guitar-card.styles.scss';

const GuitarCard = ({ guitar }) => {
  const { favoriteItems, addItemToFavorites } = useContext(FavoritesContext);
  const addGuitarToFavorites = () => {
    addItemToFavorites(guitar);
  };
  console.log(favoriteItems);

  return (
    <div className="guitar-card">
      <div className="img-wrap">
        <img src={guitar.photo} alt="product-preview" />
      </div>
      <div className="card-content">
        <h4>{`${guitar.name} ${guitar.model}`}</h4>
        <p>{`${guitar.price} $`} </p>
        <Button actionOnClick={addGuitarToFavorites}>Add to Favorites</Button>
      </div>
    </div>
  );
};

export default GuitarCard;
