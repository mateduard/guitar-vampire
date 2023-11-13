import Navigation from './navigation/navigation.component';
import Foot from './foot/foot.component';

import React from 'react';
import './layout.styles.scss';

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      {children}
      <Foot />
    </>
  );
};

export default Layout;
