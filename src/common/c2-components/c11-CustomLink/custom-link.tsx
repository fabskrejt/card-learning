import React from "react";
import { Link } from "react-router-dom";
import styles from "./custom-link.module.scss"

type CustomLinkPropsType = {
    address: string
    text: string
}

export const CustomLink = ({address, text}: CustomLinkPropsType) => {
    return(
        <div className={styles.container}>
            <Link to={address} className={styles.linkElement}>
                {text}
            </Link>
        </div>
    )
}