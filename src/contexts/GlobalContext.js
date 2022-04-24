import { props } from 'bluebird';
import React, { createContext, useState } from 'react';

const GlobalContext = createContext();
const GlobalConsumer = GlobalContext.Consumer;

const GlobalProvider = () => {
  const [state, setState] = useState([]);

  const store = { state, setState };

  return (
    <GlobalContext.Provider value={store}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalConsumer, GlobalProvider };
