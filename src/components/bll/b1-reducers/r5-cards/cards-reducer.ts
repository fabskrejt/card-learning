import {cardsApi} from "../../../../dal/cardsApi";
import {AppStateType} from "../../b2-store/store";
import {ThunkAction} from "redux-thunk";
import {setPopupMessageAC, SetPopupMessageAT} from "../app/app-reducer";
import {v1} from "uuid";

const initState = {
    cards: [],
    cardsTotalCount: 0,
    maxGrade: 5,
    minGrade: 0,
    page: 1,
    pageCount: 4,
    packUserId: "",
    isFetching: false,
    sortCards: ""
}

export const cardsReducer = (state: InitStateType = initState, action: CardsActionType): InitStateType => {
    switch (action.type) {
        case "CARD-REDUCER/SET-CARDS":
            return {
                ...state, cards: action.cards, cardsTotalCount: action.cardsTotalCount, packUserId: action.packUserId
            }
        case "CARD-REDUCER/SET-PAGE":
            return {
                ...state, page: action.page
            }
        case "CARD-REDUCER/SET-PAGE-COUNT":
            return {
                ...state, pageCount: action.pageCount
            }
        case "CARD-REDUCER/SET-CARDS-IS-FETCHING":
            return {
                ...state, isFetching: action.isFetch
            }
        case "CARD-REDUCER/SET-SORT-CARDS":
            return {
                ...state, sortCards: action.sortCards
            }
        default:
            return state
    }
}

type SetCardsAT = ReturnType<typeof setCards>
export const setCards = (cards: Array<Cards>, cardsTotalCount: number, packUserId: string) => {
    return {
        type: "CARD-REDUCER/SET-CARDS",
        cards, cardsTotalCount, packUserId
    } as const
}

type SetCardsPageAT = ReturnType<typeof setCardsPage>
export const setCardsPage = (page: number) => {
    return {
        type: "CARD-REDUCER/SET-PAGE",
        page,
    } as const
}

type SetCardsPageCountAT = ReturnType<typeof setCardsPageCount>
export const setCardsPageCount = (pageCount: number) => {
    return {
        type: "CARD-REDUCER/SET-PAGE-COUNT",
        pageCount,
    } as const
}
type SetCardsIsFetchingAT = ReturnType<typeof setCardsIsFetching>
export const setCardsIsFetching = (isFetch: boolean) => {
    return {
        type: "CARD-REDUCER/SET-CARDS-IS-FETCHING",
        isFetch
    } as const
}
type setSortCardsAT = ReturnType<typeof setSortCardsAC>
export const setSortCardsAC = (sortCards: string) => {
    return {
        type: "CARD-REDUCER/SET-SORT-CARDS",
        sortCards
    } as const
}

//Thunks
export const setCardsTC = (cardsPackID: string): ThunkType =>

    (dispatch, getState: () => AppStateType) => {
        dispatch(setCardsIsFetching(true))
        const pageCount = getState().cards.pageCount
        const page = getState().cards.page
        const sortCards = getState().cards.sortCards
        cardsApi.getCards(cardsPackID, pageCount, page, sortCards)
            .then((res) => {
                    dispatch(setCards(res.data.cards, res.data.cardsTotalCount, res.data.packUserId))
                    dispatch(setCardsIsFetching(false))
                }
            ).catch((e: any) => {
                dispatch(setPopupMessageAC(
                    {
                        type: "error",
                        message: `${e.response.data.error}`,
                        id: v1()
                    }
                ))
            }
        )
    }

export const createCardTC = (cardsPack_id: string, question: string, answer: string): ThunkType =>
    dispatch => {
        cardsApi.createCard(cardsPack_id, question, answer)
            .then((res) => {
                dispatch(setCardsTC(cardsPack_id))
                dispatch(setPopupMessageAC(
                    {
                        type: "success",
                        message: `Card "${res.data.newCard.question}" created`,
                        id: v1()
                    }
                ))
            })
            .catch((e: any) => {
                dispatch(setPopupMessageAC(
                    {
                        type: "error",
                        message: `${e.response.data.error}`,
                        id: v1()
                    }
                ))
            })
    }

export const deleteCardTC = (card_id: string): ThunkType =>
    dispatch => {
        cardsApi.deleteCard(card_id)
            .then((res) => {
                dispatch(setCardsTC(res.data.deletedCard.cardsPack_id))
                dispatch(setPopupMessageAC(
                    {
                        type: "success",
                        message: `Card "${res.data.deletedCard.question}" deleted`,
                        id: v1()
                    }
                ))
            })
            .catch((e: any) => {
                dispatch(setPopupMessageAC(
                    {
                        type: "error",
                        message: `${e.response.data.error}`,
                        id: v1()
                    }
                ))
            })
    }
export const changeCardTC = (card_id: string, question: string, answer: string): ThunkType =>
    dispatch => {
        cardsApi.changeCard(card_id, question, answer)
            .then((res) => {
                dispatch(setCardsTC(res.data.updatedCard.cardsPack_id))

                dispatch(setPopupMessageAC(
                    {
                        type: "success",
                        message: `Pack ${res.data.updatedCard.question} created`,
                        id: v1()
                    }
                ))
            })
            .catch((e: any) => {
                dispatch(setPopupMessageAC(
                    {
                        type: "error",
                        message: `${e.response.data.error}`,
                        id: v1()
                    }
                ))
            })
    }

//Types
//type InitStateType = typeof initState
type InitStateType = {
    cards: Array<Cards>,
    cardsTotalCount: number,
    maxGrade: number,
    minGrade: number,
    page: number,
    pageCount: number,
    packUserId: string
    isFetching: boolean
    sortCards: string
}
type CardsActionType =
    SetCardsAT
    | SetCardsPageAT
    | SetCardsPageCountAT
    | SetCardsIsFetchingAT
    | setSortCardsAT


type  ThunkType = ThunkAction<void, AppStateType, unknown, CardsActionType | SetPopupMessageAT>
export type Cards = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    __v: number
    _id: string
}
