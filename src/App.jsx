import React from 'react'
import CrudApp from './components/CrudApp'
import CrudApi from './components/CrudApi';

const App = () => {

  return (
    <>
      <CrudApi />
      <CrudApp />
      <hr />
    </>
  );
};

export default App