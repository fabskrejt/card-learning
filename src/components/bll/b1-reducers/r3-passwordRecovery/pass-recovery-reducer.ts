import {Dispatch} from "redux";
import {authApi} from "../../../../dal/cardsApi";

const initState = {
    error: '',
    isToggleError: false,
    email: ''
}
type InitStateType = typeof initState;


export const passwordRecoveryReducer = (state: InitStateType = initState, action: ActionType) => {
    switch (action.type) {
        case "PASSWORD-RECOVERY-REDUCER/SET-ERROR":
            return {
                ...state,
                error: action.error
            }
        case "PASSWORD-RECOVERY-REDUCER/IS-TOGGLE-ERROR":
            return {
                ...state,
                isToggleError: action.isToggleError
            }
        case "PASSWORD-RECOVERY-REDUCER/SET-EMAIL":
            return {
                ...state,
                email: action.email
            }
        default:
            return state
    }
}
const setErrorAC = (error: string) => ({type: "PASSWORD-RECOVERY-REDUCER/SET-ERROR", error} as const)
const isToggleErrorAC = (isToggleError: boolean) => ({
    type: "PASSWORD-RECOVERY-REDUCER/IS-TOGGLE-ERROR",
    isToggleError
} as const)
const setEmailAC = (email: string) => ({type: "PASSWORD-RECOVERY-REDUCER/SET-EMAIL", email} as const)


export const passwordRecovery = (email: string) => async (dispatch: Dispatch) => {
    try {
        let res = authApi.passwordRecovery(email)
        dispatch(setEmailAC(email))
        dispatch(isToggleErrorAC(true))
    } catch (err: any) {
        dispatch(isToggleErrorAC(err.response.data.error))
    }
}

type setErrorACType = ReturnType<typeof setErrorAC>
type isToggleErrorACType = ReturnType<typeof isToggleErrorAC>
type setEmailACType = ReturnType<typeof setEmailAC>
type ActionType = setErrorACType | isToggleErrorACType | setEmailACType
