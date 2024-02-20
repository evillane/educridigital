
import './index.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {combineReducers} from 'redux';
import reportWebVitals from  './reportWebVitals';
import authReducer from './Stored/Reducers/auth';
import cartBuilderReducer from './Stored/Reducers/cartBuilder'
import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
//import {thunk} from 'redux-thunk';

const rootReducer = combineReducers({
  auth: authReducer,
  cartBuilder: cartBuilderReducer
});

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
//const middleware = [thunk]; 

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
})

let persistor = persistStore(store);

const app = (
  <Provider store= {store}>
    <BrowserRouter>
    <PersistGate loading={null} persistor={persistor}>
    <App></App>
    </PersistGate>
    </BrowserRouter>
  </Provider>
);

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
reportWebVitals();
