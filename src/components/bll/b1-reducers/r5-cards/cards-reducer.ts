import {Dispatch} from "redux";
import {cardsApi} from "../../../../dal/cardsApi";
import {AppStateType} from "../../b2-store/store";
import {ThunkAction} from "redux-thunk";


const initState = {
    cards: [{}],
    cardsTotalCount: 3,
    maxGrade: 5,
    minGrade: 0,
    page: 1,
    packUserId: ''
}
type Cards = {
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
type InitStateType = typeof initState
type CardsActionType = SetCardsAT
export const cardsReducer = (state: InitStateType = initState, action: CardsActionType): InitStateType => {
    switch (action.type) {
        case "CARD-REDUCER/SET-CARDS":
            return {
                ...state, cards: action.cards
            }
        default:
            return state
    }
}

type SetCardsAT = ReturnType<typeof setCards>
export const setCards = (cards: Array<Cards>) => {
    return {
        type: "CARD-REDUCER/SET-CARDS",
        cards,
    } as const
}

type CreateCardAT = ReturnType<typeof createCard>
export const createCard = (name: string) => {
    return {
        type: "CARD-REDUCER/CREATE-CARD",
        name,
    } as const
}

type deleteCardAT = ReturnType<typeof deleteCard>
export const deleteCard = (id: string) => {
    return {
        type: "CARD-REDUCER/DELETE-CARD",
        id,
    } as const
}


export const setCardsTC = (cardsPackID:string) =>
    (dispatch: Dispatch) => {
        cardsApi.getCards(cardsPackID)
            .then((res) => {
                    dispatch(setCards(res.data.cardPacks))
                }
            )
    }

type  ThunkType = ThunkAction<void, AppStateType, unknown, CardsActionType>
export const createCardTC = (cardsPack_id: string, question: string, answer: string):ThunkType => dispatch => {
    cardsApi.createCard(cardsPack_id,question,answer)
        .then(() => dispatch(setCardsTC(cardsPack_id)))
}

export const deleteCardTC = (card_id: string): ThunkType =>
    dispatch => {
        cardsApi.deleteCard(card_id)
            .then((res) => dispatch(setCardsTC(res.data.deletedCard.cardsPack_id)))
    }
export const changeCardTC = (card_id: string, question: string, answer: string ): ThunkType =>
    dispatch => {
        cardsApi.changeCard(card_id,question,answer )
            .then((res) => {
                dispatch(setCardsTC(res.data.updatedCard.cardsPack_id))
            })
    }

