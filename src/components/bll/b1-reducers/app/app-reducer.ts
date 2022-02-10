import {Dispatch} from "redux";
import {authApi} from "../../../../dal/cardsApi";
import {setIsLoggedInAC, setLoginErrorAC, setUserDataAC} from "../r1-login/login-reduser";


const initState = {
    isFetching: false
}

type AppInitStateType = typeof initState

type AppActionType = SetIsFetchingAT

export const appReducer = (state: AppInitStateType = initState, action: AppActionType) => {
    switch (action.type) {
        case "APP/SET-IS-FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state
    }
}

export type SetIsFetchingAT = ReturnType<typeof setIsFetchingAC>
export const setIsFetchingAC = (isFetching: boolean) => {
    return {
        type: "APP/SET-IS-FETCHING",
        isFetching
    } as const
}

//THUNK

export const isAuthUserT = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setIsFetchingAC(true))
        let res = await authApi.isAuthUser()
        if (res.data._id) {
            const {_id, email, name, avatar = "", publicCardPacksCount} = res.data
            dispatch(setIsLoggedInAC(true))
            dispatch(setUserDataAC(_id, email, name, avatar, publicCardPacksCount))
        }
    } catch (e: any) {
        const error = e.response
            ? e.response.data.error
            : e.message + ", more details in the console"
        console.log("Error: ", {...e})
        dispatch(setLoginErrorAC(error))
    } finally {
        dispatch(setIsFetchingAC(false))
    }
}

export const logoutUserT = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setIsFetchingAC(true))
        const res = await authApi.logout()
        console.log(res)
        dispatch(setIsLoggedInAC(false))
        dispatch(setUserDataAC("", "", "", "", 0))

    } catch (e: any) {
        const error = e.response
            ? e.response.data.error
            : e.message + ", more details in the console"
        console.log("Error: ", {...e})
        dispatch(setLoginErrorAC(error))
    } finally {
        dispatch(setIsFetchingAC(false))
    }
}