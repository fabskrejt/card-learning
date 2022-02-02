import {combineReducers, createStore} from "redux";

const reducers = combineReducers({

})

export const store = createStore(reducers)

export type AppStateType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store // for dev
