import React from "react"
import {CustomInput} from "../../../common/c2-components/c1-CustomInput/CustomInput";
import {CustomButton} from "../../../common/c2-components/c2-CustomButton/CustomButton";
import SuperCheckbox from "../../../common/c2-components/c3-SuperCheckbox/SuperCheckbox";

export const TestPage = () => {
    return (
        <div>
            <CustomInput/>
            <CustomButton>
                Click
            </CustomButton>
            <SuperCheckbox/>
        </div>
    )
}