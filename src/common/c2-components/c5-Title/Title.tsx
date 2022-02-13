import React from "react"
import styles from "./Title.module.scss"

type TitlePropsType = {
    text: string
}

export const Title = ({text}: TitlePropsType) => {
    return (
        <div className={styles.container}>
            <h3>
                {text}
            </h3>
        </div>
    )
}