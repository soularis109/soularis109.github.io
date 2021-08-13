
import {applyMiddleware, combineReducers, createStore} from "redux";
import filmsReducer from "./films-reducer";
import thunkMiddleware from 'redux-thunk';

let reducers = combineReducers({
    movies: filmsReducer
})
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, applyMiddleware(thunkMiddleware)
);
window.store = store;
export default store;