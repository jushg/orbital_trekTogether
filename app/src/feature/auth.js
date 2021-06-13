import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        // isLoading: true,
        isSignout: false,
        userID: null,
    },
    reducers:{
        signIn: (state,{ payload }) => {
            state.isSignout = true
            state.userID = payload.uid
        },
        signOut: state => {
            state.isSignout = false
            state.userID = null
        },
        // restoredToken: (state,{ payload }) => {
        //     state.isLoading = false
        //     state.userID = payload.uid
        // }

    }
})

const { signIn, signOut } = authSlice.actions

export const signedIn = (user) => signIn({user})
export const signedOut = () => signOut()
// export const restoreToken = (user) => restoredToken({user})

export const getUserID = createSelector(
    (state) => state.auth,
    (auth) => auth.userID
)

export default authSlice.reducer