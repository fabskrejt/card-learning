import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from "react"
import styles from "./SuperCheckbox.module.scss"

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperCheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
}

const SuperCheckbox: React.FC<SuperCheckboxPropsType> = (
    {
        type,
        onChange, onChangeChecked,
        className,
        children,

        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeChecked &&
        onChangeChecked(e.currentTarget.checked)

        onChange &&
        onChange(e)

    }

    return (
        <div className={styles.container}>
            <label>
                <input
                    type={"checkbox"}
                    onChange={onChangeCallback}
                    className={styles.checkbox}

                    {...restProps}
                />
                {children && <span className={styles.spanClassName}>{children}</span>}
            </label>
        </div>

    )
}

export default SuperCheckbox
