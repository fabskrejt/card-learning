import React, {useState} from "react"
import styles from "./add-pack.module.scss"
import {CustomInput} from "../../../../common/c2-components/c1-CustomInput/CustomInput";
import {CustomButton} from "../../../../common/c2-components/c2-CustomButton/CustomButton";
import {Title} from "../../../../common/c2-components/c5-Title/Title";
import {useDispatch} from "react-redux";
import {createPackTC} from "../../../bll/b1-reducers/r4-packs/packs-reducer";
import {withModalWindow} from "../../../../common/c3-hoc/h1-modal-window/modal-window";

type AddPackPropsType = {
    closeModal: () => void
}

export const AddPack = withModalWindow(({closeModal}:AddPackPropsType) => {
    
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    const changeName = (value: string) => {
        setName(value)
    }
    const close = () => {
        closeModal()
    }

    const createPack = () => {
        dispatch(createPackTC(name, "", false))
        closeModal()
    }

    return(
        <div className={styles.modalContainer}>
            <Title text={"Create Pack"}/>

            <div className={styles.contentContainer}>
                <CustomInput
                    labelText={'name'}
                    onChangeText={changeName}
                />
                <div className={styles.btnContainer}>
                    <CustomButton onClick={createPack}>
                        Create
                    </CustomButton>
                    <CustomButton onClick={close}>
                        Close
                    </CustomButton>
                </div>

            </div>
        </div>

    )
})