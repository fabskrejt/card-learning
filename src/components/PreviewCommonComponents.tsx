import SuperInputText from "../common/c1-SuperInputText/SuperInputText";
import SuperButton from "../common/c2-SuperButton/SuperButton";
import SuperCheckbox from "../common/c3-SuperCheckbox/SuperCheckbox";
import SuperEditableSpan from "../common/c4-SuperEditableSpan/SuperEditableSpan";
import SuperRadio from "../common/c6-SuperRadio/SuperRadio";

export const PreviewCommonComponents =()=>{
    return(
        <div>
            <SuperInputText/>
            <SuperButton>Button</SuperButton>
            <SuperCheckbox>Checkbox</SuperCheckbox>
            <SuperEditableSpan/>
            <SuperRadio>Radio</SuperRadio>
        </div>
    )
}