import {Dispatch} from "redux";
import {setIsFetchingAC} from "../app/app-reducer";
import {authApi, cardPacksApi} from "../../../../dal/cardsApi";
import {resError} from "../Errors";


const initState = {
    cardPacks: [{}],
    cardPacksTotalCount: 3,
    maxCardsCount: 9999,
    minCardsCount: 0,
    page: 1,
    pageCount: 4
}
type Card = {
    _id: string
    user_id: string
    name: string
    path?: string
    cardsCount: number
    grade?: number
    shots?: number
    rating?: number
    type?: string
    created: string
    updated: string
    __v?: number
}
type InitStateType = typeof initState
type PacksActionType = setMinCardsInPackAT
    | setMaxCardsInPackAT
    | deletePackAT
    | setCardPacks
export const packsReducer = (state: InitStateType = initState, action: PacksActionType): InitStateType => {
    switch (action.type) {
        case "PACKS-REDUCER/SET-MIN-CARDS-IN-PACK":
            return {
                ...state, minCardsCount: action.min
            }
        case "PACKS-REDUCER/SET-MAX-CARDS-IN-PACK":
            return {
                ...state, maxCardsCount: action.max
            }
        case "PACKS-REDUCER/SET-CARD-PACKS":
            return {
                ...state, cardPacks: action.cards
            }
        default:
            return state
    }
}

type setMinCardsInPackAT = ReturnType<typeof setMinCardsInPack>
export const setMinCardsInPack = (min: number) => {
    return {
        type: "PACKS-REDUCER/SET-MIN-CARDS-IN-PACK",
        min,
    } as const
}

type setMaxCardsInPackAT = ReturnType<typeof setMaxCardsInPack>
export const setMaxCardsInPack = (max: number) => {
    return {
        type: "PACKS-REDUCER/SET-MAX-CARDS-IN-PACK",
        max,
    } as const
}

type setCardPacks = ReturnType<typeof setCardPacks>
export const setCardPacks = (cards: Array<Card>) => {
    return {
        type: "PACKS-REDUCER/SET-CARD-PACKS",
        cards,
    } as const
}

export const createPack = (name: string) => {
    return {
        type: "PACKS-REDUCER/CREATE-PACK",
        name,
    } as const
}


type deletePackAT = ReturnType<typeof deletePack>
export const deletePack = (max: number) => {
    return {
        type: "PACKS-REDUCER/SET-MAX-CARDS-IN-PACK",
        max,
    } as const
}


export const setCardPacksTC = (userId: string, min: string = '', max: string, sortPacks: string, page: number, pageCount: number) =>
    (dispatch: Dispatch) => {
        cardPacksApi.getCardPacks(userId, min, max, sortPacks, page, pageCount)
            .then((res) => {debugger
                    dispatch(setCardPacks(res.data.cardPacks))
                }
            )
    }


export const createPackTC = (name: string, deckCover: string = '', privat: boolean) => (dispatch: Dispatch) => {
    cardPacksApi.createCardsPack(name, deckCover, privat)
        .then(() => cardPacksApi.getCardPacks())
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
            //dispatch(setIsLoggedInAC(true))
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