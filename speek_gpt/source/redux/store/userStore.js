import { combineReducers } from 'redux';
import userReducer from '../user/userReducers';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    user: userReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk]
});
