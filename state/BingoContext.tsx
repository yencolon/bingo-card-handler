import React, { createContext, useContext, useReducer } from 'react';


const initialState: BingoState = {

};

const BingoContext = createContext(initialState);


const bingoReducer = (state: BingoState, action: BingoAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const BingoProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(bingoReducer, initialState);
  
  return (
    <BingoContext.Provider value={{ state, dispatch }}>
      {children}
    </BingoContext.Provider>
  );
}

export const useTaskContext = () => useContext(BingoContext);