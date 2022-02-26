import React from "react"
import {CustomInput} from "../../../common/c2-components/c1-CustomInput/CustomInput";
import {CustomButton} from "../../../common/c2-components/c2-CustomButton/CustomButton";
import {CustomCheckbox} from "../../../common/c2-components/c3-CustomCheckbox/CustomCheckbox";

export const TestPage = () => {
    return (
        <div>
            <CustomInput/>
            <CustomButton>
                Click
            </CustomButton>
            <CustomCheckbox/>
        </div>
    )
}