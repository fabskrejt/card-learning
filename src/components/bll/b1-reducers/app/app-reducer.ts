import {Dispatch} from "redux";
import {authApi} from "../../../../dal/cardsApi";
import {setIsLoggedInAC, setUserDataAC} from "../r1-login/login-reduser";
import {resError} from "../Errors";


const initState = {
    isFetching: false,
    popupMessages: [] as PopupMessageType[]
}

export type PopupMessageType = {
    type: "error" | "success"
    message: string
    id: string
}
type AppInitStateType = typeof initState

type AppActionType = SetIsFetchingAT
    | SetPopupMessageAT
    | DeletePopupMessageAT

export const appReducer = (state: AppInitStateType = initState, action: AppActionType): AppInitStateType => {
    switch (action.type) {
        case "APP/SET-IS-FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "APP/SET-POPUP-MESSAGE":
            return {
                ...state, popupMessages: [...state.popupMessages, action.message]
            }
        case "APP/DELETE-POPUP-MESSAGE":
            return {
                ...state, popupMessages: action.popupMessages
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

export type SetPopupMessageAT = ReturnType<typeof setPopupMessageAC>
export const setPopupMessageAC = (message: PopupMessageType) => {
    return {
        type: "APP/SET-POPUP-MESSAGE",
        message
    } as const
}

export type DeletePopupMessageAT = ReturnType<typeof deletePopupMessageAC>
export const deletePopupMessageAC = (popupMessages: any) => {
    return {
        type: "APP/DELETE-POPUP-MESSAGE",
        popupMessages
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
        const error = resError(e)
        console.log("Error: ", error, {...e})
    } finally {
        dispatch(setIsFetchingAC(false))
    }
}

export const logoutUserT = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setIsFetchingAC(true))
        const res = await authApi.logout()

        dispatch(setIsLoggedInAC(false))
        dispatch(setUserDataAC("", "", "", "", 0))

    } catch (e: any) {
        const error = resError(e)
        console.log("Error: ", error, {...e})
    } finally {
        dispatch(setIsFetchingAC(false))
    }
}