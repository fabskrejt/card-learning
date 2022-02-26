import {Dispatch} from "redux";
import {setIsFetchingAC, setPopupMessageAC} from "../app/app-reducer";
import {authApi} from "../../../../dal/cardsApi";
import {v1} from "uuid";


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
type LoginActionType = setIsLoggedInAT | setUserDateAT
export const loginReducer = (state: InitStateType = initState, action: LoginActionType): InitStateType => {
    switch (action.type) {
        case "LOGIN-REDUCER/IS-LOGGED-IN":
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
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


export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    dispatch(setIsFetchingAC(true))
    authApi.login(email, password, rememberMe)
        .then(res => {
            const {_id, email, name, avatar = "", publicCardPacksCount} = res.data
            dispatch(setIsLoggedInAC(true))
            dispatch(setUserDataAC(_id, email, name, avatar, publicCardPacksCount))
        })
        .catch((e) => {

            console.log("Error: ", {...e})

            dispatch(setPopupMessageAC(
                {
                    type: "error",
                    message: `${e.response.data.error}`,
                    id: v1()
                }
            ))

        })
        .finally(() =>
            dispatch(setIsFetchingAC(false))
        )
}