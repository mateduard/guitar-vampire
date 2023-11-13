import './home.styles.scss';
import { NavLink } from 'react-router-dom';

import Slider from '../../components/slider/slider.component';
import Carousel from '../../components/carousel/carousel.component';

import bar1 from '../../assets/bar1.png';
import bar2 from '../../assets/bar2.png';
import bar3 from '../../assets/bar3.png';

const Home = () => {
  const gallery_images = [
    'https://cdn11.bigcommerce.com/s-hvzya2q3vy/product_images/uploaded_images/guit-work-banner.png',
    'https://img.apmcdn.org/55683039cad3a8c6326eadae04107f375208de49/uncropped/ceb86f-oncampus-files-2014-05-guitar-workshop.jpg',
    'https://www.myrareguitars.com/guitar-pictures/martin-guitar-workshop.jpg',
    'https://musicalinstrumentcrafts.co.uk/img/asset/YXNzZXRzL29nL21pYy1vZy1pbWFnZS12Ni5qcGc=?w=1200&h=630&fit=crop&s=b06d241b34810d64a4e2b7fc56683799',
  ];
  return (
    <>
      <Slider />
      <NavLink to="/guitars" className="home-hero">
        <div className="hero-background"></div>
        <div className="small-hero">
          <h1 className="hero-h1">Buy Your Unique Vintage Guitar</h1>
          <h2 className="hero-h2">New products every week. Shop them here</h2>
        </div>
      </NavLink>
      <div className="container0">
        <div className="c0-photo-wrapper">
          <img
            src="https://i.ibb.co/ThjFBsN/hi-removebg-preview.png"
            alt="dracula-photo"
          />
        </div>
        <div className="c0-text-wrapper">
          <h2>
            " I've been using Guitar Vampire products for 3 lives and they still
            rock! "
          </h2>
          <p>
            <i>
              At Guitar Vampire they believe that anything can be revived and no
              challenge is too big for them. If restored and mainained
              correctly, a guitar has no expiration date - they simply can't
              die. I've been using Guitar Vampire products for 3 lives and they
              still rock!
            </i>
          </p>
          <p>- Count Dracula, probably (we were too afraid to ask him)</p>
        </div>
      </div>
      <div className="bar1">
        <img src={bar1} className="bar1"></img>
      </div>
      <div className="container1">
        <div className="c1-text-wrapper">
          <h2>
            We put in not only our time and work, but our more than 15 years of
            experience in working with the best pieces of art ever seen.
          </h2>
        </div>
        <Carousel />
      </div>
      <div className="bar2">
        <img src={bar2} className="bar2"></img>
      </div>
      <div className="container2">
        <div className="gallery">
          {gallery_images.map((image, index) => {
            return (
              <span key={index + 1}>
                <img src={image} alt={'gallery_photo' + (index + 1)} />
              </span>
            );
          })}
        </div>
      </div>
      <div className="bar3">
        <img src={bar3} className="bar3"></img>
      </div>
    </>
  );
};

export default Home;
