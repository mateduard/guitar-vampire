import './navigation.styles.scss';
import { Outlet, NavLink } from 'react-router-dom';

import mainLogo from '../../assets/logo.png';
import guitarLogo from '../../assets/guitar.svg';
import favorites from '../../assets/favorites.png';

const Navigation = () => {
  return (
    <>
      <nav className="nav-container">
        <NavLink to="/guitars" className="left-wrapper">
          <img src={guitarLogo} alt="guitar logo" className="guitar-logo" />
          <p>Guitars</p>
        </NavLink>
        <div className="center-wrapper">
          <h1 className="nav-title">Guitar</h1>
          <NavLink to="/" className='main-logo-wrapper'>
            <img src={mainLogo} alt="logo" className="main-logo" />
          </NavLink>
          <h1 className="nav-title">Vampire</h1>
        </div>
        <NavLink to="/favorites" className="right-wrapper">
          <img
            src={favorites}
            alt="favorites icon"
            className="favorites-logo"
          />
          <p>Favorites</p>
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
};

export default Navigation;
