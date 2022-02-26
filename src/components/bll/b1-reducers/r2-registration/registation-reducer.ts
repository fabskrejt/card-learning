import {Dispatch} from "redux";
import {authApi} from "../../../../dal/cardsApi";
import {setIsFetchingAC, SetIsFetchingAT, setPopupMessageAC, SetPopupMessageAT} from "../app/app-reducer";
import {v1} from "uuid";


const initState = {
    error: "",
    isRegistered: false,
}

type InitStateType = typeof initState

type RegistrationActionType = SetIsRegisteredAT

export const registrationReducer = (state: InitStateType = initState, action: RegistrationActionType) => {
    switch (action.type) {
        case "REGISTRATION-REDUCER/IS-REGISTERED":
            return {
                ...state,
                isRegistered: action.isRegistered
            }
        default:
            return state
    }
}

type SetIsRegisteredAT = ReturnType<typeof setIsRegisteredAC>
export const setIsRegisteredAC = (isRegistered: boolean) => {
    return {
        type: "REGISTRATION-REDUCER/IS-REGISTERED",
        isRegistered
    } as const
}


//THUNK

type RegistrationDispatchType = RegistrationActionType | SetIsFetchingAT | SetPopupMessageAT

export const testPing = () => (dispatch: Dispatch<RegistrationDispatchType>) => {
    authApi.ping()
        .then(res => {
            console.log(res)
        })
}

export const registerUser = (email: string, password: string) => async (dispatch: Dispatch<RegistrationDispatchType>) => {

    dispatch(setIsFetchingAC(true))
    try {
        let res = await authApi.registerUser(email, password)

        dispatch(setIsRegisteredAC(true))
    } catch (e: any) {
        console.log("Error: ", {...e})

        dispatch(setPopupMessageAC(
            {
                type: "error",
                message: `${e.response.data.error}`,
                id: v1()
            }
        ))
    } finally {
        dispatch(setIsFetchingAC(false))
    }
}

