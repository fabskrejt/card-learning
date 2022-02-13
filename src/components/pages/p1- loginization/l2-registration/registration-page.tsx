import React from "react"
import styles from "./registration.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../../bll/b1-reducers/r2-registration/registation-reducer";
import {useFormik} from "formik";
import * as Yup from "yup";
import {CustomInput} from "../../../../common/c2-components/c1-CustomInput/CustomInput";
import {CustomButton} from "../../../../common/c2-components/c2-CustomButton/CustomButton";
import {AppStateType} from "../../../bll/b2-store/store";
import {Navigate} from "react-router-dom";
import {Preloader} from "../../../../common/c2-components/c4-Preloader/Preloader";
import { Title } from "../../../../common/c2-components/c5-Title/Title";
import {Error} from "../../../../common/c2-components/c8-Error/Error";

export const RegistrationPage = () => {

    let dispatch = useDispatch()

    const registrationError = useSelector<AppStateType, string>(state => state.registration.error)
    const isRegistered = useSelector<AppStateType, boolean>(state => state.registration.isRegistered)
    const isFetching = useSelector<AppStateType, boolean>(state => state.app.isFetching)
    const isLoggedIn = useSelector<AppStateType, boolean>((state => state.login.isLoggedIn))


    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            passwordConfirm: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
            password: Yup.string()
                .min(8, "Min length 8")
                .required("Required"),
            passwordConfirm: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Required"),
        }),
        onSubmit: values => {
            let {email, password} = values
            dispatch(registerUser(email, password))
        }
    })

    if (isLoggedIn) {
        return <Navigate to={"/profile"}/>
    }
    if (isRegistered) {
        return <Navigate to={"/login"}/>
    }

    return (
        <div className={styles.container}>

            <Title text={"Sing Up"}/>

            {isFetching && <Preloader/>}

            {/*Form and form errors*/}
            <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
                <CustomInput
                    type={"text"}
                    placeholder={'Email'}
                    labelText={"email"}
                    errorMessage={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                    {...formik.getFieldProps("email")}
                />

                <CustomInput
                    type={"password"}
                    placeholder={"Password"}
                    labelText={"password"}
                    errorMessage={formik.touched.password && formik.errors.password ? formik.errors.password : ""}
                    {...formik.getFieldProps("password")}
                />

                <CustomInput
                    type={"password"}
                    placeholder={"Password"}
                    labelText={"repeat password"}
                    errorMessage={formik.touched.passwordConfirm && formik.errors.passwordConfirm ? formik.errors.passwordConfirm : ""}
                    {...formik.getFieldProps("passwordConfirm")}
                />

                <CustomButton
                    type={"submit"}
                    disabled={isFetching}
                >
                    Register
                </CustomButton>
            </form>

            {/*Request Error*/}
            {registrationError && <Error error={registrationError}/>}
        </div>
    )
}