import React, {useState} from "react"
import styles from "./edit-card-modal.module.scss"
import {withModalWindow} from "../../../../common/c3-hoc/h1-modal-window/modal-window";
import {CustomButton} from "../../../../common/c2-components/c2-CustomButton/CustomButton";
import {changeCardTC} from "../../../bll/b1-reducers/r5-cards/cards-reducer";
import {useDispatch} from "react-redux";
import {Title} from "../../../../common/c2-components/c5-Title/Title";
import {CustomInput} from "../../../../common/c2-components/c1-CustomInput/CustomInput";

type CardEditModalPropsType = {
    closeModal: () => void
    id: string
}

export const CardEditModal = withModalWindow(({closeModal, id}: CardEditModalPropsType) => {

    const dispatch = useDispatch()

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

    const updateCardBtn = () => {
        dispatch(changeCardTC(id, question, answer))
    }

    return (
        <div className={styles.modalContainer}>
            <Title text={"Edit"}/>
            <CustomInput
                value={question}
                placeholder={"Question"}
                onChangeText={changeQuestionText}
            />
            <CustomInput
                value={answer}
                placeholder={"Answer"}
                onChangeText={changeAnswerText}
            />
            <div className={styles.btnContainer}>
                <CustomButton onClick={updateCardBtn}>Edit Card</CustomButton>
                <CustomButton onClick={close}>Close</CustomButton>
            </div>
        </div>
    )
})