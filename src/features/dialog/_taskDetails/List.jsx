import Ellipse from "../../../common/UI/Ellipse"
import { useTaskContext } from "../../../context/TaskContext"
import { open_options, select_option, handleAddTag } from "./handleTaskModal"
import { IconAdd } from "../../../assets/Icons"
import { StatusItem, TagItem } from "./ListItem"
import { statuses } from "../../../assets/mocks"
/---/

export default function List({ title, arr, addTag, className, id }){
    const { setTaskItem, taskItem } = useTaskContext();

    return(
        <div className={`task-details_modal__statusBox ${className && className}`}>
            <span className="r-fieldName">{ title }</span>
    
            <div className="statusBox-currentSelected r-currentSelected" onClick={(e) => open_options(e)}>
                {
                    title == "Status"
                    ? <>
                        <Ellipse theme={ statuses.find(status => status.idName == taskItem.status)?.color }/>
                        <span style={{ textTransform: "capitalize" }}>{ taskItem.status.split("-").join(" ") }</span>
                      </>
                    : <> 
                        {
                            taskItem.tags.length > 0
                            ? taskItem.tags.map((tag, index) => (<span key={index}>{ tag }</span>))
                            : <span style={{border: "none", opacity: ".6"}}>Without tags</span>
                        } 
                      </>
                }
            </div>
    
            <ul className="statusBox-list r-list_options" data-id={ id } onClick={(e) => select_option(e, { id, setTaskItem })}>
                {
                    id == "status"
                    ? statuses.map((status, index) => <StatusItem name={ status.name } color={ status.color } index={ index } />)
                    : taskItem.tags.map(tag => <TagItem name={ tag } />)
                }

                { addTag && 
                    <li className="add-new-tag r-flex">
                        <input type="text" name="add new tag" title="add new tag" placeholder="to do tomorrow..."/>
                        <button type="button" className="r-defaultBTN r-flex" onClick={(e) => handleAddTag(e, { setTaskItem })}> Add New Tag <IconAdd/> </button>
                    </li>
                }
            </ul>
        </div>
    )
}