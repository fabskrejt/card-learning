import React from "react"
import {useFormik} from "formik";
import {Link, Navigate} from "react-router-dom";
import {passwordRecovery} from "../../../bll/b1-reducers/r3-passwordRecovery/pass-recovery-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../bll/b2-store/store";
import styles from "./passwordRecovery.module.scss"
import {CustomInput} from "../../../../common/c2-components/c1-CustomInput/CustomInput";
import {CustomButton} from "../../../../common/c2-components/c2-CustomButton/CustomButton";
import {Preloader} from "../../../../common/c2-components/c4-Preloader/Preloader";
import * as Yup from "yup";
import { Title } from "../../../../common/c2-components/c5-Title/Title";
import {Error} from "../../../../common/c2-components/c8-Error/Error";

export const PassRecoveryPage = () => {
    const dispatch = useDispatch()
    const isToggleError = useSelector<AppStateType, boolean>((state) => state.passwordRecovery.isToggleError)
    const isFetching = useSelector<AppStateType, boolean>(state => state.app.isFetching)
    const passwordRecoveryError = useSelector<AppStateType, string>((state) => state.passwordRecovery.error)
    const email = useSelector<AppStateType, string>((state) => state.passwordRecovery.email)
    const isLoggedIn = useSelector<AppStateType, boolean>((state => state.login.isLoggedIn))

    const formik = useFormik({
        initialValues: {
            email: email,
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
        }),
        onSubmit: values => {
            dispatch(passwordRecovery(values.email))
        }
    })

    if (isToggleError) {
        return (<div className={styles.forgotPage}>
            <div className={styles.container}>
                <div className={styles.img}> </div>
                <h3 className={styles.title}>Check Email</h3>
                <p className={styles.text}>We’ve sent an Email with instructions to {email}</p>
            </div>
        </div>)
    }

    if (isLoggedIn) {
        return <Navigate to={"/profile"}/>
    }

    return (
        <div className={styles.container}>
            {isFetching && <Preloader/>}
            <div className={styles.formContainer}>

                <Title text={"Forgot your password?"}/>

                <form onSubmit={formik.handleSubmit} className={styles.form}>
                    <CustomInput
                        type={"text"}
                        placeholder={'Email'}
                        labelText={"email"}
                        errorMessage={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                        {...formik.getFieldProps("email")}
                    />

                    {passwordRecoveryError && <Error error={passwordRecoveryError}/>}
                    <p>Enter your email address and we will send you further
                        instructions </p>
                    <div className={styles.block}>
                        <CustomButton
                            type={"submit"}
                            disabled={isFetching}
                        >
                            Send Instructions
                        </CustomButton>
                        <p className={styles.text}>Did you remember your password?</p>
                        <Link className={styles.link} to="/login">Try logging in</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}