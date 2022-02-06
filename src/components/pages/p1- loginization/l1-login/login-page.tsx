import React from "react"
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../bll/b2-store/store";
import {useFormik} from "formik";
import {loginTC} from "../../../bll/b1-reducers/r1-login/login-reduser";
import SuperInputText from "../../../../common/c2-components/c1-SuperInputText/SuperInputText";
import SuperCheckbox from "../../../../common/c2-components/c3-SuperCheckbox/SuperCheckbox";
import SuperButton from "../../../../common/c2-components/c2-SuperButton/SuperButton";
import {Preloader} from "../../../../common/c2-components/c4-Preloader/Preloader";
import {Navigate} from "react-router-dom";
import styles from "./login-page.module.scss";
import * as Yup from "yup";

export const LoginPage = () => {
    const isLoggedIn = useSelector<AppStateType, boolean>((state => state.login.isLoggedIn))
    const loginError = useSelector<AppStateType, string>((state => state.login.error))
    const isFetching = useSelector<AppStateType, boolean>(state => state.app.isFetching)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            remember: false
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
            password: Yup.string()
                .required("Required"),
        }),
        onSubmit: (values) => {
            let {email, password, remember} = values
            dispatch(loginTC(email, password, remember))
            formik.resetForm()
        },
    });

    if (isLoggedIn) {
        return <Navigate to={"/profile"}/>
    }
    return (
        <div className={styles.container}>
            <h2>
                Sing In
            </h2>
            {isFetching && <Preloader/>}
            <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
                <SuperInputText
                    type={"email"}
                    placeholder={"email"}
                    {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className={styles.error}>{formik.errors.email}</div>
                ) : null}

                <SuperInputText
                    type={"password"}
                    placeholder={"password"}
                    {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div className={styles.error}>{formik.errors.email}</div>
                ) : null}
                <SuperCheckbox
                    type={"remember"}
                    {...formik.getFieldProps("remember")}
                > Remember</SuperCheckbox>
                <SuperButton type="submit">Login</SuperButton>
            </form>
            {loginError && <div>{loginError}</div>}
        </div>
    )
}