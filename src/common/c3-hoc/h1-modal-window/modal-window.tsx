import React from "react";
import styles from "./modal-window.module.scss"

export const withModalWindow = (Component: any) => {
    const Modal = (props: any) => {
        return(
            (
                <div className={styles.modal}>
                    <Component
                        {...props}
                    />
                </div>
            )
        )
    }
    return Modal
}