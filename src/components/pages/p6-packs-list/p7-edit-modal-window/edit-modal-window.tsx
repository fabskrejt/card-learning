import React, {useState} from "react"
import {Title} from "../../../../common/c2-components/c5-Title/Title"
import styles from "./edit-modal-window.module.scss"
import {CustomInput} from "../../../../common/c2-components/c1-CustomInput/CustomInput";
import {CustomButton} from "../../../../common/c2-components/c2-CustomButton/CustomButton";
import {withModalWindow} from "../../../../common/c3-hoc/h1-modal-window/modal-window";
import {useDispatch} from "react-redux";
import {changePackTC} from "../../../bll/b1-reducers/r4-packs/packs-reducer";

type EditModalWindowPropsType = {
    closeWindow: () => void
    packId: string
}

export const EditModalWindow = withModalWindow(({closeWindow, packId}: EditModalWindowPropsType) => {
    const dispatch = useDispatch()
    const [value, setValue] = useState("")
    const changeValue = (value: string) => {
        setValue(value)
    }
    const close = () => {
        closeWindow()
    }

    const editPack = () => {
        dispatch(changePackTC(packId ,value))
        close()
    }

    return (
        <div className={styles.modalContainer}>
            <Title text={"Edit"}/>
            <CustomInput
                value={value}
                placeholder={"New Name"}
                onChangeText={changeValue}
            />
            <div className={styles.btnContainer}>
                <CustomButton
                    onClick={editPack}
                >
                    change
                </CustomButton>
                <CustomButton
                    onClick={close}
                >
                    close
                </CustomButton>
            </div>
        </div>

    )
})