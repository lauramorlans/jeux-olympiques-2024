import React from 'react';
import TopHeader from '../TopHeader';

const MainLayout = (props) => {
  return (
    <React.Fragment>
      <TopHeader />
      {props.children}
    </React.Fragment>
  );
};

export default MainLayout;