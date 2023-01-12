import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { authReducer } from "./auth/reducer";
import { reducer } from "./user/reducer";
import thunk from "redux-thunk";
import { cartReducer } from "./cart/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  app: reducer,
  cart: cartReducer
});

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);
