import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
// import localStorage from 'redux-persist/lib/storage' // defaults to localStorage for web
import AsyncStorage from '@react-native-async-storage/async-storage';
import { rootReducer } from './reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  const store = configureStore({
      reducer: persistedReducer,
      middleware: [
        ...getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
          }
        }),
        store => next => action => {
          next(action);
          console.log("Middleware - Redux", store.getState());
        }
      ]
    })
  const persistor = persistStore(store)
  return { store, persistor }
}