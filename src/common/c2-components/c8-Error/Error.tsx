import React from "react"
import styles from "./Error.module.scss"

type ErrorPropsType = {
    error: string
}

export const Error = ({error}: ErrorPropsType) => {
    return (
        <div className={styles.error}>
            {error}
        </div>
    )
}