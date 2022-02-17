import {cardPacksApi} from "../../../../dal/cardsApi";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../../b2-store/store";


const initState = {
    cardPacks: [{}],
    settings: {
        maxCardsCount: 9999,
        minCardsCount: 0,
        page: 1,
        pageCount: 4,
        sortPacks: '0updated'
    },
    showAllPacks: true
}

export const packsReducer = (state: InitStateType = initState, action: PacksActionType): InitStateType => {
    switch (action.type) {
        case "PACKS-REDUCER/SET-MIN-CARDS-IN-PACK":
            return {
                ...state, settings: {...state.settings, minCardsCount: action.min}
            }
        case "PACKS-REDUCER/SET-MAX-CARDS-IN-PACK":
            return {
                ...state, settings: {...state.settings, minCardsCount: action.max}
            }
        case "PACKS-REDUCER/SET-CARD-PACKS":
            return {
                ...state, cardPacks: action.cards
            }
        case "PACKS-REDUCER/SET-SHOW-ALL-PACKS":
            return {
                ...state, showAllPacks: action.value
            }
        case "PACKS-REDUCER/SET-PAGE":
            return {
                ...state, settings: {...state.settings, page: action.page}
            }
        case "PACKS-REDUCER/SET-PAGE-COUNT":
            return {
                ...state, settings: {...state.settings, pageCount: action.pageCount}
            }
        case "PACKS-REDUCER/SET-SORT-PACKS":
            return {
                ...state, settings: {...state.settings, sortPacks: action.value}
            }
        default:
            return state
    }
}

type SetMinCardsInPackAT = ReturnType<typeof setMinCardsInPack>
export const setMinCardsInPack = (min: number) => {
    return {
        type: "PACKS-REDUCER/SET-MIN-CARDS-IN-PACK",
        min,
    } as const
}

type SetMaxCardsInPackAT = ReturnType<typeof setMaxCardsInPack>
export const setMaxCardsInPack = (max: number) => {
    return {
        type: "PACKS-REDUCER/SET-MAX-CARDS-IN-PACK",
        max,
    } as const
}

type SetPageAT = ReturnType<typeof setPage>
export const setPage = (page: number) => {
    return {
        type: "PACKS-REDUCER/SET-PAGE",
        page,
    } as const
}

type SetPageCountAT = ReturnType<typeof setPageCount>
export const setPageCount = (pageCount: number) => {
    return {
        type: "PACKS-REDUCER/SET-PAGE-COUNT",
        pageCount,
    } as const
}

type SetSortPacksAT = ReturnType<typeof setSortPacks>
export const setSortPacks = (value: string) => {
    return {
        type: "PACKS-REDUCER/SET-SORT-PACKS",
        value,
    } as const
}

type setCardPacksAT = ReturnType<typeof setCardPacks>
export const setCardPacks = (cards: Array<CardPacks>) => {
    return {
        type: "PACKS-REDUCER/SET-CARD-PACKS",
        cards,
    } as const
}

type ShowAllCards = ReturnType<typeof setShowAllPacks>
export const setShowAllPacks = (value: boolean) => {
    return {
        type: "PACKS-REDUCER/SET-SHOW-ALL-PACKS",
        value,
    } as const
}

//Thunks
export const setCardPacksTC = (): ThunkType =>
    (dispatch, getState) => {
        const state = getState()
        const userId = state.packs.showAllPacks
            ? ''
            : state.login.userData._id
        const settings = state.packs.settings
        const {minCardsCount, maxCardsCount, page, pageCount, sortPacks} = settings

        cardPacksApi.getCardPacks(userId, minCardsCount, maxCardsCount, sortPacks, page, pageCount)
            .then((res) => {
                    dispatch(setCardPacks(res.data.cardPacks))
                }
            )
    }

type  ThunkType = ThunkAction<void, AppStateType, unknown, PacksActionType>
export const createPackTC = (name: string, deckCover: string = '', privat: boolean): ThunkType =>
    dispatch => {
        cardPacksApi.createCardsPack(name, deckCover, privat)
            .then(() => {
                dispatch(setCardPacksTC())
            })
    }

export const deletePackTC = (packId: string): ThunkType =>
    dispatch => {
        cardPacksApi.deleteCardsPack(packId)
            .then(() => {
                dispatch(setCardPacksTC())
            })
    }

export const changePackTC = (packId: string, name: string): ThunkType =>
    dispatch => {
        cardPacksApi.changeCardsPack(packId, name)
            .then(() => {
                dispatch(setCardPacksTC())
            })
    }

//Types
type InitStateType = typeof initState

type PacksActionType =
    SetMinCardsInPackAT
    | SetMaxCardsInPackAT
    | ShowAllCards
    | setCardPacksAT
    | SetPageAT
    | SetPageCountAT
    | SetSortPacksAT

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
