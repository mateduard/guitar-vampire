import './favorite-card.styles.scss';

const FavoriteCard = ({ item, remFct }) => {
  return (
    <>
      <div className="favorite-card">
        <img src={item.photo} alt="guitar-photo" />
        <p className="name">{item.name}</p>
        <p className="model">{item.model}</p>
        <p className="price">{`${item.price} $`}</p>
        <button className="remove-button" onClick={remFct}>
          <span>&#10005;</span>
        </button>
      </div>
    </>
  );
};

export default FavoriteCard;
