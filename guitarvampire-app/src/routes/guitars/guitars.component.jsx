import { useEffect, useState } from 'react';
import './guitars.styles.scss';
import { NavLink } from 'react-router-dom';

import { getGuitars } from '../../api/guitarsApi';

import GuitarCard from '../../components/guitar-card/guitar-card.component';

const Guitars = () => {
  const [guitars, setGuitars] = useState([]);
  useEffect(() => {
    async function guitarsFetch() {
      const res = await getGuitars();
      await setGuitars(res.data.response);
    }
    guitarsFetch();
  }, []);

  // console.log(guitars);

  return (
    <>
      <NavLink to="/contact" className="guitars-hero">
        <div className="hero-background"></div>
        <div className="small-hero">
          <h1 className="hero-h1">Found anything you like? Contact us!</h1>
          <h2 className="hero-h2">Click here for more information</h2>
        </div>
      </NavLink>
      <main className="guitars-container">
        {guitars.map((guitar) => {
          return <GuitarCard guitar={guitar} key={guitar._id} />;
        })}
      </main>
    </>
  );
};

export default Guitars;
