import SuperInputText from "../common/c1-SuperInputText/SuperInputText";
import SuperButton from "../common/c2-SuperButton/SuperButton";
import SuperCheckbox from "../common/c3-SuperCheckbox/SuperCheckbox";
import SuperEditableSpan from "../common/c4-SuperEditableSpan/SuperEditableSpan";
import SuperRadio from "../common/c6-SuperRadio/SuperRadio";
import SuperSelect from "../common/c5-SuperSelect/SuperSelect";
import {useState} from "react";

export const PreviewCommonComponents =()=>{
    const arr = ['x', 'y', 'z']
    const [value, onChangeOption] = useState(arr[1])
    return(
        <div>
            <SuperInputText error={'error'}/>
            <SuperButton>Button</SuperButton>
            <SuperCheckbox> Checkbox</SuperCheckbox>
            <SuperEditableSpan/>
            <SuperRadio>Radio</SuperRadio>
            <SuperSelect
                options={arr}
                value={value}
                onChangeOption={onChangeOption}
                />
        </div>
    )
}