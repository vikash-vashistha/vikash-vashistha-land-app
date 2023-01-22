import {SET_CART } from "./action"


const initState = {
  total : 0,
  cart: []
}

export const cartReducer = (state = initState, action) => {
  switch (action.type) {
        case SET_CART:
      return {
        total: action.payload.reduce((a, e) => {
          return a + +e.plot_id.price
        }, 0),
        cart: action.payload,
      };
    default:
      return state;
  }
}