import {configureStore, combineReducers} from '@reduxjs/toolkit';
import ScreenNameSlice from './slice/ScreenNameSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartSlice from './slice/CartSlice';
import ProductDataSlice from './slice/ProductDataSlice';
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
const rootReducer = combineReducers({
  screen: ScreenNameSlice,
  cart:CartSlice,
  product:ProductDataSlice
});
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['screen','cart'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
