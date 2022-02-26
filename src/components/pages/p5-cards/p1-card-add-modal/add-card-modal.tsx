import React, {useState} from "react"
import styles from "./add-card-modal.module.scss"
import {withModalWindow} from "../../../../common/c3-hoc/h1-modal-window/modal-window";
import {CustomButton} from "../../../../common/c2-components/c2-CustomButton/CustomButton";
import {createCardTC} from "../../../bll/b1-reducers/r5-cards/cards-reducer";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {Title} from "../../../../common/c2-components/c5-Title/Title";
import {CustomInput} from "../../../../common/c2-components/c1-CustomInput/CustomInput";

type AddCardModalPropsType = {
    closeModal: () => void
}

export const AddCardModal = withModalWindow(({closeModal}: AddCardModalPropsType) => {

    const dispatch = useDispatch()
    const {id} = useParams()

    const [question, setQuestion] = useState("")
    const [answer, setSetAnswer] = useState("")

    const changeQuestionText = (value: string) => {
        setQuestion(value)
    }

    const changeAnswerText = (value: string) => {
        setSetAnswer(value)
    }

    const close = () => {
        closeModal()
    }

    const addCardBtn = () => {
        if (id) {
            dispatch(createCardTC(id, question, answer))
            close()
        }
    }

    return (
        <div className={styles.modalContainer}>
            <Title text={"Edit"}/>
            <CustomInput
                value={question}
                placeholder={"Question"}
                onChangeText={changeQuestionText}
                labelText={"Question"}
            />
            <CustomInput
                value={answer}
                placeholder={"Answer"}
                onChangeText={changeAnswerText}
                labelText={"Answer"}
            />
            <div className={styles.btnContainer}>
                <CustomButton onClick={addCardBtn}>Add new card</CustomButton>
                <CustomButton onClick={close}>Close</CustomButton>
            </div>
        </div>
    )
})