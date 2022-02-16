import {Dispatch} from "redux";
import {cardPacksApi} from "../../../../dal/cardsApi";
import {ThunkAction} from "redux-thunk";
import {AppStateType, store} from "../../b2-store/store";


const initState = {
    cardPacks: [{}],
    cardPacksTotalCount: 3,
    maxCardsCount: 9999,
    minCardsCount: 0,
    page: 1,
    pageCount: 4
}
type CardPacks = {
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
    | setCardPacksAT
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

type setCardPacksAT = ReturnType<typeof setCardPacks>
export const setCardPacks = (cards: Array<CardPacks>) => {
    return {
        type: "PACKS-REDUCER/SET-CARD-PACKS",
        cards,
    } as const
}

type CreatePackAT = ReturnType<typeof createPack>
export const createPack = (name: string) => {
    return {
        type: "PACKS-REDUCER/CREATE-PACK",
        name,
    } as const
}

type deletePackAT = ReturnType<typeof deletePack>
export const deletePack = (id: string) => {
    return {
        type: "PACKS-REDUCER/DELETE-PACK",
        id,
    } as const
}


export const setCardPacksTC = (userId: string, min: number, max: number , sortPacks: string, page: number, pageCount: number) =>
    (dispatch: Dispatch) => {
        cardPacksApi.getCardPacks(userId, min, max, sortPacks, page, pageCount)
            .then((res) => {
                    debugger
                    dispatch(setCardPacks(res.data.cardPacks))
                }
            )
    }

type  ThunkType = ThunkAction<void, AppStateType, unknown, PacksActionType>
export const createPackTC = (name: string, deckCover: string = '', privat: boolean): ThunkType => (dispatch, getState) => {
    cardPacksApi.createCardsPack(name, deckCover, privat)
        .then(() => {
            const state = getState()
            const userId = state.login.userData._id
            const min = state.packs.minCardsCount
            const max = state.packs.maxCardsCount
            const page = state.packs.page
            const pageCount = state.packs.pageCount
            //const sortPacks = state.packs.
            debugger
            dispatch(setCardPacksTC(userId, min, max, '', page, pageCount))
        })
}
