import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profileReducer";
import {loginReducer} from "./loginReducer";

const reducers = combineReducers({
profile: profileReducer,
    login: loginReducer,

})

export const store = createStore(reducers)

export type AppStateType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store // for dev
