import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import auth from './Auth';
import ecom from './Ecom';
import uid from './UID'
import storage from 'redux-persist/lib/storage';

const reducers = combineReducers({
  auth,
  ecom,
  uid
});

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: [ 'auth','ecom','uid'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
    return middlewares;
  },
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export {store, persistor};
