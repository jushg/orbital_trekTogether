import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer, { authSlice } from '../src/feature/auth'

//directory of all reducer
const rootReducer = combineReducers ({
  auth: authSlice

})

export default configureStore({
  reducer: rootReducer
  }
)