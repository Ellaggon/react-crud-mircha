import React from 'react'
import CrudApp from './components/CrudApp'
import CrudApi from './components/CrudApi';
import SelectAnidados from './components/SelectAnidados';

const App = () => {

  return (
    <>
      <SelectAnidados />
      <hr />
      <CrudApi />
      <hr />
      <CrudApp />
      <hr />
    </>
  );
};

export default App