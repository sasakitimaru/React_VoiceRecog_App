import { combineReducers } from 'redux';
import userReducer from '../user/userReducers';
import { configureStore } from '@reduxjs/toolkit';
import planReducer from '../Plan/planReducers';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    user: userReducer,
    planContent: planReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk]
});