import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react"
import styles from "./CustomButton.module.scss"

// тип пропсов обычной кнопки
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type CustomButtonPropsType = DefaultButtonPropsType & {
    myStyle?: boolean
}

export const CustomButton: React.FC<CustomButtonPropsType> = (
    {
        myStyle, className,
        ...restProps
    }
) => {
    const finalClassName = `${myStyle ? myStyle : ""} ${styles.element}`

    return (
        <div className={styles.btnContainer}>
            <button
                className={finalClassName}

                {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
            />
        </div>
    )
}
