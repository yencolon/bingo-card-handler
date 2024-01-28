import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import * as cards from "../mock/bingoCardMock.json";

const initialState: BingoState = {
  cards: [
    {
      id: 1,
      title: "mock",
      isBingo: false,
      boxes: cards.cards.map((card) => {
        const b = card as BingoBox;
        return {
          description: b.description,
          boundingPoly: {
            vertices: b.boundingPoly.vertices.map((v) => {
              return {
                x: v.x,
                y: v.y,
              };
            }),
          },
          checked: b.description === "Free",
        } as BingoBox;
      }),
    },
  ],
  recentFoundCards: [],
  numbers: [],
};

const BingoContext = createContext<BingoContextType>({
  state: initialState,
  dispatch: () => null,
});

const bingoReducer = (state: BingoState, action: BingoAction) => {
  switch (action.type) {
    case "SET_CARDS":
      return {
        ...state,
        cards: state.cards.concat(action.payload),
      };
    case "ADD_NUMBER":
      return {
        ...state,
        numbers: state.numbers.concat({
          value: action.payload.numberToAdd,
          found: false,
        }),
      };
    case "UPDATE_NUMBER":
      return {
        ...state,
        numbers: state.numbers.map((number) => {
          if (number.value === action.payload.number) {
            return {
              ...number,
              found: action.payload.found,
            };
          }
          return number;
        }),
      };
    case "UPDATE_BOX":
      return {
        ...state,
        cards: state.cards.map((card) => {
          if (card.id === action.payload.cardId) {
            console.log("card found");
            return {
              ...card,
              boxes: card.boxes.map((box) => {
                if (box.description === action.payload.box.description) {
                  console.log("box found and updated");
                  return {
                    ...box,
                    checked: true,
                  };
                }
                return box;
              }),
            };
          }
          return card;
        }),
      };
    case "UPDATE_BINGO":
      return {
        ...state,
        cards: state.cards.map((card) => {
          if (card.id === action.payload.cardId) {
            console.log("card found");
            return {
              ...card,
              isBingo: action.payload.isBingo,
            };
          }
          return card;
        }),
      };
    case "UPDATE_RECENT_FOUND":
      return {
        ...state,
        recentFoundCards: state.recentFoundCards.concat(
          state.recentFoundCards.filter(
            (card) => card.id == action.payload.cardId
          )
            ? state.cards.filter((card) => {
                return card.id === action.payload.cardId;
              })
            : []
        ),
      };
    case "RESET_RECENT_FOUND":
      return {
        ...state,
        recentFoundCards: [],
      };
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
};

export const useBingoContext = () => useContext(BingoContext);
