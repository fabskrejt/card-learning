import {Dispatch} from "redux";
import {setIsFetchingAC} from "../app/app-reducer";
import {authApi} from "../../../../dal/cardsApi";
import {resError} from "../Errors";


const initState = {
    isLoggedIn: false,
    error: "",
    userData: {
        _id: "",
        email: "",
        name: "",
        avatar: "",
        publicCardPacksCount: 0,
    },
}

type InitStateType = typeof initState
type LoginActionType = setIsLoggedInAT | setLoginErrorAT | setUserDateAT
export const loginReducer = (state: InitStateType = initState, action: LoginActionType): InitStateType => {
    switch (action.type) {
        case "LOGIN-REDUCER/IS-LOGGED-IN":
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
            }
        case "LOGIN-REDUCER/SET-ERROR":
            return {
                ...state, error: action.error
            }
        case "LOGIN-REDUCER/SET-USER-DATA": {
            return {
                ...state, userData: {...action.payload}
            }
        }
        default:
            return state
    }
}

type setIsLoggedInAT = ReturnType<typeof setIsLoggedInAC>
export const setIsLoggedInAC = (isLoggedIn: boolean) => {
    return {
        type: "LOGIN-REDUCER/IS-LOGGED-IN",
        isLoggedIn,
    } as const
}

type setUserDateAT = ReturnType<typeof setUserDataAC>
export const setUserDataAC = (_id: string, email: string, name: string, avatar: string, publicCardPacksCount: number) => {
    return {
        type: "LOGIN-REDUCER/SET-USER-DATA",
        payload: {
            _id,
            email,
            name,
            avatar,
            publicCardPacksCount
        },
    } as const
}

type setLoginErrorAT = ReturnType<typeof setLoginErrorAC>
export const setLoginErrorAC = (error: string) => {
    return {
        type: "LOGIN-REDUCER/SET-ERROR",
        error
    } as const
}

export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    dispatch(setIsFetchingAC(true))
    authApi.login(email, password, rememberMe)
        .then(res => {
            const {_id, email, name, avatar = "", publicCardPacksCount} = res.data
            dispatch(setIsLoggedInAC(true))
            dispatch(setUserDataAC(_id, email, name, avatar, publicCardPacksCount))
        })
        .catch((e) => {
            const error = resError(e)
            console.log('Error: ', {...e})
            dispatch(setLoginErrorAC(error))

        })
        .finally(() =>
            dispatch(setIsFetchingAC(false))
        )
}