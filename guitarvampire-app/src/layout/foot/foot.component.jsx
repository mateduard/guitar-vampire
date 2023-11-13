import './foot.styles.scss';
import { NavLink } from 'react-router-dom';

import igLogo from '../../assets/igLogo.svg';
import fbLogo from '../../assets/fbLogo.svg';

const Foot = () => {
  return (
    <>
      <footer>
        <div className="site-links">
          <NavLink className="site-link" to="/">
            Home
          </NavLink>
          <NavLink className="site-link" to="/guitars">
            Guitars
          </NavLink>
          <NavLink className="site-link" to="/favorites">
            Favorites
          </NavLink>
          <NavLink className="site-link" to="/repairs">
            Repairs
          </NavLink>
        </div>
        <div className="social-wrapper">
          <a href="https://www.instagram.com/">
            <img src={igLogo} alt="instagram logo" className="social-logo" />
          </a>
          <a href="https://www.facebook.com/">
            <img src={fbLogo} alt="facebook logo" className="social-logo" />
          </a>
        </div>
        <div className="rights-container">
          <p className="rights-paragraph">
            © 2023 Guitar Vampire. All rights reserved <span>|</span>
            <a href="">Terms of Service</a>
            <span>|</span>
            <a href="">Privacy</a>
            <span>|</span>
            <a href="">Legal</a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Foot;
