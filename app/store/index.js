import { combineReducers } from 'redux'

import authReducer from '../src/feature/auth'

export const rootReducer = combineReducers ({
    auth: authReducer
  })