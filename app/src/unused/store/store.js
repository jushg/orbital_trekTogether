import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from "redux-persist";
import { AsyncStorage }                 from '@react-native-async-storage/async-storage'
import storage from 'redux-persist/lib/storage';
//directory of all reducer
import { rootReducer } from './index';

const persistConfig = {
  key: "root",
  storage: AsyncStorage
};

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer)
  }
)

const persistor = persistStore(store);

const getPersistor = () => persistor;
const getStore = () => store;

export {
    getStore,
    getPersistor
};