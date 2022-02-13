import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from "react"
import styles from "./CustomInput.module.scss"

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>


type CustomInputPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    errorMessage?: string
    labelText?: string
}

export const CustomInput: React.FC<CustomInputPropsType> = (
    {
        type,
        onChange, onChangeText,
        onKeyPress, onEnter,
        errorMessage,
        className,
        labelText,
        ...restProps
    }
) => {


    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange
        && onChange(e)

        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter
        && e.key === "Enter"
        && onEnter()
    }

    const finalInputClassName = `${errorMessage && styles.errorInput} ${className ? className : styles.customInput}`

    return (
        <div className={styles.container}>

            <div className={styles.label}>
                {labelText}
            </div>

            <input
                type={type}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={finalInputClassName}

                {...restProps}
            />
            {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        </div>
    )
}
