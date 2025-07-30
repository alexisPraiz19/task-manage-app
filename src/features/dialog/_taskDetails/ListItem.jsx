import Ellipse from "../../../common/UI/Ellipse"
import { handleDeleteTag } from "./handleTaskModal"

export function StatusItem({ name, color, index }){
    return(
        <li>
            <label>
                <input type="radio" 
                    name={ name } className="list-item_input" 
                    value={ name } 
                    data-color={ color } 
                    defaultChecked={ index == 0 ? true : false }
                />
                { color && <Ellipse theme={ color }/> }
                { name }
            </label>
        </li>
    )
}

export function TagItem({ name }){
    return(
        <li className="tag-item r-flex">
            <span className="tag-item_name" style={{ textTransform: "capitalize" }}>{ name.split("-").join(" ") }</span>
            <button type="button" title="delete tag"  className="BTN-delete_tag r-defaultBTN r-flex" onClick={(e) => handleDeleteTag(e)}> Delete tag </button>
        </li>
    )
}