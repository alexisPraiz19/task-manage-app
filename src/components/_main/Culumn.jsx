import Task from "./Task"
import Ellipse from "../../common/UI/Ellipse"
import { IconAdd } from "../../assets/Icons"
import { useTaskContext } from "../../context/TaskContext"
import { dragOver, dropTask } from "../../features/dragdrop/handleDragDrop"
/---/

export default function Column({ theme, column, name, tasks, BTN_addTask }) {
    const { setTaskItem } = useTaskContext();
    const { boardID, setBoardsList }     = useTaskContext();

    return (
        <div className="main-column" 
            data-column = { column } 
            onDragOver  = {(e) => dragOver(e)}
            onDrop      = {(e) => dropTask(e, { boardID, setBoardsList })}
        >
            <h3 className="main-column_title"><Ellipse theme={ theme }/> { name } ({ tasks.length })</h3>

            <div className="main-column_tasks">
                {
                    tasks.map(({ id, photo, title, status, tags }) => (
                        <Task
                            id     = { id }
                            photo  = { photo }
                            title  = { title }
                            status = { status }
                            tags   = { tags }
                        />
                    ))
                }
            </div>

            { BTN_addTask && 
                <button type="button" className="main-column__add-task r-flex r-defaultBTN" onClick={() =>{
                    document.getElementById("task-details").showModal();
                    setTaskItem({ id: "", title: "", status: "backlog", photo: null, tags: [] })
                }}>
                   Add new task card <IconAdd/>
                </button> 
            }
        </div>
    );
}