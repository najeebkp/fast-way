import React from "react";

const InitialState = {
  cartCount: 0,
  cartItems: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOTAL_CART_COUNT":
      return {
        ...state,
        cartCount: action.payload,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: action.payload,
      };
    default:
      return state;
  }
};

export const GlobalContext = React.createContext({
  globalState: InitialState,
  globalDispatchActions: () => {},
});

export const GlobalContextProvider = ({ children }) => {
  const [globalState, globalDispatch] = React.useReducer(reducer, InitialState);
  return (
    <GlobalContext.Provider value={{ globalState, globalDispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
