import React from "react";
import styles from './Card.module.scss'
import {useDispatch} from "react-redux";

type PropsType = {
    card: any
}
export const Card = ({card, ...props}: PropsType) => {
    const dispatch = useDispatch()

    const deleteCardBtn = (cardsPack_id: string, id: string) => {
       // dispatch(deleteCard(cardsPack_id, id))
    }
    const updateCardBtn = (cardsPack_id: string, id: string) => {
      //  dispatch(updateCard(cardsPack_id, id))
    }
    return (
        <div className={styles.card}>
            <div className={styles.question}>{card.question}</div>
            <div className={styles.answer}>{card.answer}</div>
            <div className={styles.updated}>{card.updated.slice(0, 10).split('-').reverse().join('.')}</div>
            <div className={styles.grade}>{card.grade}</div>
            <div>
                <button onClick={() => deleteCardBtn(card.cardsPack_id, card._id)}>Delete</button>
            </div>
            <div>
                <button onClick={() => updateCardBtn(card.cardsPack_id, card._id)}>Edit</button>
            </div>
        </div>
    )
}