import React from "react";
import {Link} from "react-router-dom";
import styles from "./Navigation.module.scss"

export const Navigation = () => {
    return (
        <div className={styles.container}>
            <nav>
                <Link to={"profile"}>Profile</Link>
                <Link to={"packs-list"}>Pack List</Link>
            </nav>
        </div>

    )
}