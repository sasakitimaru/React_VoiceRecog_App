import { combineReducers } from 'redux';
import userReducer from '../user/userReducers';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    user: userReducer
});
console.log(rootReducer.user);
export const userStore = configureStore({
  reducer: rootReducer
});
