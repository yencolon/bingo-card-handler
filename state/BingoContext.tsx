import React, { createContext, useContext, useReducer } from 'react';

const initialState: BingoState = {
  cards: [],
  currentCard: undefined,
};


const BingoContext = createContext<BingoContextType | undefined>(undefined);


const bingoReducer = (state: BingoState, action: BingoAction) => {
  switch (action.type) {
    case 'SET_CARDS':
      return {
        ...state,
        cards: state.cards.concat(action.payload)
      };
    default:
      return state
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

export const useBingoContext = () => useContext(BingoContext);