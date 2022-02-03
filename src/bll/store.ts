import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profileReducer";
import {loginReducer} from "./loginReducer";
import {changePasswordReducer} from "./changePasswordReducer";
import {recoveryPasswordReducer} from "./recoveryPasswordReducer";
import {registrationReducer} from "./registrationReducer";

const reducers = combineReducers({
    profile: profileReducer,
    login: loginReducer,
    changePassword: changePasswordReducer,
    recoveryPassword: recoveryPasswordReducer,
    registration: registrationReducer
})

export const store = createStore(reducers)

export type AppStateType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store // for dev
