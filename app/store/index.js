import { combineReducers } from 'redux'

import { authSlice } from '../src/feature/auth'

export const rootReducer = combineReducers ({
    auth: authSlice
  })