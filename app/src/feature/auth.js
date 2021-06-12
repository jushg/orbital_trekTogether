import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoading: true,
        isSignout: false,
        userID: null,
    },
    reducers:{
        signedIn: (state,{ payload }) => {
            state.isSignout = true
            state.userID = payload.uid
        },
        signedOut: state => {
            state.isSignout = false
            state.userID = null
        },
        restoredToken: (state,{ payload }) => {
            state.isLoading = false
            state.userID = payload.uid
        }

    }
})

const { signedIn, signedOut, restoredToken } = authSlice.actions

export const signIn = (user) => signedIn({user})
export const signOut = () => signedOut()
export const restoreToken = (user) => restoredToken({user})

export const getUserID = createSelector(
    (state) => state.auth,
    (auth) => auth.userID
)

export default authSlice.reducer