import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from "redux-persist";
import { AsyncStorage }                 from '@react-native-async-storage/async-storage'

//directory of all reducer
import { rootReducer } from './index';

const persistConfig = {
  key: "root",
  storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer
  }
)

const persistor = persistStore(store);

const getPersistor = () => persistor;
const getStore = () => store;

export {
    getStore,
    getPersistor
};