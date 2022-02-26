import React from "react"
import {Navigate, useParams} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import styles from "../l2-registration/registration.module.scss";
import {Preloader} from "../../../../common/c2-components/c4-Preloader/Preloader";
import {CustomInput} from "../../../../common/c2-components/c1-CustomInput/CustomInput";
import {CustomButton} from "../../../../common/c2-components/c2-CustomButton/CustomButton";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../bll/b2-store/store";
import {setNewPassT} from "../../../bll/b1-reducers/r3-passwordRecovery/pass-recovery-reducer";
import {Title} from "../../../../common/c2-components/c5-Title/Title";

export const CreateNewPassPage = () => {

    const resetPasswordToken = useParams()
    const dispatch = useDispatch()
    const isFetching = useSelector<AppStateType, boolean>(state => state.app.isFetching)
    const isCreatedNewPass = useSelector<AppStateType, boolean>(state => state.passwordRecovery.isNewPassCreated)

    const formik = useFormik({
        initialValues: {
            password: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(8, "Min length 8")
                .required("Required"),
        }),
        onSubmit: values => {

            resetPasswordToken.token &&
            dispatch(setNewPassT(values.password, resetPasswordToken.token))
        }
    })

    if (isCreatedNewPass) {
        return <Navigate to={"/login"}/>
    }
    return (
        <div className={styles.container}>

            <Title text={"Password recovery"}/>

            {isFetching && <Preloader/>}

            {/*Form and form errors*/}
            <form onSubmit={formik.handleSubmit} className={styles.formContainer}>

                <CustomInput
                    type={"password"}
                    labelText={"new password"}
                    placeholder={"Password"}
                    {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div className={styles.error}>{formik.errors.password}</div>
                ) : null}


                <CustomButton
                    type={"submit"}
                    disabled={isFetching}
                >
                    Register
                </CustomButton>
            </form>
        </div>
    )
}