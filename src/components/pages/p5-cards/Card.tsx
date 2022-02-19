import React from "react";
import styles from './Card.module.scss'
import {useDispatch} from "react-redux";
import {Cards, changeCardTC, deleteCardTC} from "../../bll/b1-reducers/r5-cards/cards-reducer";

type PropsType = {
    card: Cards
}
export const Card = ({card, ...props}: PropsType) => {
    const dispatch = useDispatch()

    const deleteCardBtn = (id: string) => {
        dispatch(deleteCardTC(id))
    }
    const updateCardBtn = (id: string) => {
        dispatch(changeCardTC( id,'new', 'new'))
    }
    return (
        <div className={styles.card}>
            <div className={styles.question}>{card.question}</div>
            <div className={styles.answer}>{card.answer}</div>
            <div className={styles.updated}>{card.updated.slice(0, 10).split('-').reverse().join('.')}</div>
            <div className={styles.grade}>{card.grade}</div>
            <div>
                <button onClick={() => deleteCardBtn(card._id)}>Delete</button>
            </div>
            <div>
                <button onClick={() => updateCardBtn(card._id)}>Edit</button>
            </div>
        </div>
    )
}