import {Dispatch} from "redux";
import {authApi} from "../../../../dal/cardsApi";
import {setIsFetchingAC, setPopupMessageAC} from "../app/app-reducer";
import {v1} from "uuid";

const initState = {
    error: "",
    isToggleError: false,
    email: "",
    isNewPassCreated: false
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
        case "PASSWORD-RECOVERY-REDUCER/SET-IS-NEW-PASS-CREATED":
            return {
                ...state,
                isNewPassCreated: action.isCreated
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

export const setIsNewPassCreatedAC = (isCreated: boolean) => ({
    type: "PASSWORD-RECOVERY-REDUCER/SET-IS-NEW-PASS-CREATED",
    isCreated
} as const)

//THUNK
export const passwordRecovery = (email: string) => (dispatch: Dispatch) => {
    dispatch(setIsFetchingAC(true))
    authApi.passwordRecovery(email)
        .then((res) => {
            dispatch(setEmailAC(email))
            dispatch(isToggleErrorAC(true))
        })
        .catch((e: any) => {
            console.log("Error: ", {...e})

            dispatch(setPopupMessageAC(
                {
                    type: "error",
                    message: `${e.response.data.error}`,
                    id: v1()
                }
            ))
        })
        .finally(() => {
            dispatch(setIsFetchingAC(false))
        })


}

export const setNewPassT = (password: string, resetPasswordToken: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setIsFetchingAC(true))

        const res = await authApi.createNewPass(password, resetPasswordToken)

        dispatch(setIsNewPassCreatedAC(true))
    } catch (e: any) {

        console.log("Error: ", {...e})
        dispatch(setPopupMessageAC(
            {
                type: "error",
                message: `${e.response.data.error}`,
                id: v1()
            }))
    } finally {
        dispatch(setIsFetchingAC(false))
    }

}

type setErrorACType = ReturnType<typeof setErrorAC>
type isToggleErrorACType = ReturnType<typeof isToggleErrorAC>
type setEmailACType = ReturnType<typeof setEmailAC>
type setIsNewPassCreatedAT = ReturnType<typeof setIsNewPassCreatedAC>
type ActionType = setErrorACType | isToggleErrorACType | setEmailACType | setIsNewPassCreatedAT
