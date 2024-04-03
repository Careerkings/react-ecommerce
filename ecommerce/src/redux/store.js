import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import userReducer from './userSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
 



const rootReducer = combineReducers({  
        user: userReducer,
       product: productReducer,
        cart: cartReducer
})

const persistConfig = {
    key: 'user',
    storage,
    version: 1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})

})



export const persistor = persistStore(store)