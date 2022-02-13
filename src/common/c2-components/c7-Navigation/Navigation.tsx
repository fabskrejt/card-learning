import React from "react";
import {Link} from "react-router-dom";
import styles from "./Navigation.module.scss"

export const Navigation = () => {
    return (
        <div className={styles.container}>
            <nav>
                <Link to={"login"}>Login</Link>
                <Link to={"registration"}>Registration</Link>
                <Link to={"password-recovery"}>Recovery pass</Link>
                <Link to={"new-pass"}>New Pass</Link>
                <Link to={"error"}>404</Link>
                <Link to={"test"}>Test</Link>
                <Link to={"profile"}>Profile</Link>
            </nav>
        </div>

    )
}