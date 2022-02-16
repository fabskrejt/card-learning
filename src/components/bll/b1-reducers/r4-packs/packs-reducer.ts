import {Dispatch} from "redux";
import {cardPacksApi} from "../../../../dal/cardsApi";


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
export const setCardPacks = (cards: Array<CardPacks>) => {
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
export const deletePack = (id: string) => {
    return {
        type: "PACKS-REDUCER/DELETE-PACK",
        id,
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
