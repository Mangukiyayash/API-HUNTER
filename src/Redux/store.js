import { createStore } from 'redux';
import { CartReducer } from './Reducer/CartReducer';

const store = createStore(CartReducer);

export default store;