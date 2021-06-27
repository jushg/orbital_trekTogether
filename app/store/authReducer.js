import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isSignout: false,
        user: null,
    },
    reducers:{
        signIn: (state,{ payload }) => {
            state.isSignout = true
            state.user = payload
        },
        signOut: state => {
            state.isSignout = false
            state.userID = null
        },
        restoredToken: (state,{ payload }) => {
            state.userID = payload.uid
        }

    }
})

const { signIn, signOut } = authSlice.actions

export const signedIn = (user) => signIn({user})
export const signedOut = () => signOut()

export const getUserID = createSelector(
    (state) => state.auth,
    (auth) => auth.userID
)

export default authSlice.reducer