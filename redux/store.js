import {configureStore, combineReducers} from '@reduxjs/toolkit';
import ScreenNameSlice from './slice/ScreenNameSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartSlice from './slice/CartSlice';
import ProductDataSlice, {product} from './slice/ProductDataSlice';
import UserSlice from './slice/UserSlice';
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
  cart: CartSlice,
  product: ProductDataSlice,
  user: UserSlice,
});
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['screen'],
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
