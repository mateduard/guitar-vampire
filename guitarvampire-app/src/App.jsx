import { Routes, Route } from 'react-router-dom';
import './App.css';

import Layout from './layout/layout.component';
import Home from './routes/home/home.component';
import Guitars from './routes/guitars/guitars.component';
import Favorites from './routes/favorites/favorites.component';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/guitars' element={<Guitars />} />
        <Route path='/favorites' element={<Favorites />} />
      </Routes>
    </Layout>
  );
};

export default App;
