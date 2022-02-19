import React from "react";
import {Cards} from "../../bll/b1-reducers/r5-cards/cards-reducer";
import {Card} from "./Card";
import styles from "./CardsList.module.scss";

type PropsType = {
    cards: Array<Cards>
}

export const CardsList = (props: PropsType) => {
    return (
        <div>
            <div className={styles.packsHeader}>
                <div className={styles.question}>Question</div>
                <div className={styles.answer}>Answer</div>
                <div className={styles.updated}>Last Updated</div>
                <div className={styles.grade}>Grade</div>
                <div className={styles.actions}>Actions</div>
            </div>
            {props.cards.map((c: Cards) => {
                return (<Card key={c._id} card={c}/>)
            })}
        </div>
    )
}