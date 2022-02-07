import {applyMiddleware, combineReducers, createStore} from "redux";
import {loginReducer} from "../b1-reducers/r1-login/login-reduser";
import thunk from 'redux-thunk'
import {registrationReducer} from "../b1-reducers/r2-registration/registation-reducer";
import {appReducer} from "../b1-reducers/app/app-reducer";
import {passwordRecoveryReducer} from "../b1-reducers/r3-passwordRecovery/pass-recovery-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    registration: registrationReducer,
    passwordRecovery: passwordRecoveryReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store