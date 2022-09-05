import { compose, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
}

const perisitedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [process.env.NODE_ENV !== 'production' && logger, thunk].filter(Boolean);


const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = createStore(perisitedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
