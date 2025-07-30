import { useTaskContext } from "../../context/TaskContext"
import { draggable } from "../../features/dragdrop/handleDragDrop"

export default function Task({ id, photo, title, status, tags }) {
    const { setTaskItem, boardID } = useTaskContext();

    return(
        <div className="main-column_tasks__task" draggable data-id={ id } onClick={() => {
            setTaskItem(JSON.parse(localStorage.getItem("boards")).find(board => board.id == boardID).tasks.find(task => task.id == id))
            document.getElementById("task-details").showModal()
        }}
        onDragStart={(e) => draggable(e)}
        >
            { photo && <img src={photo} alt={title} className="task-photo" /> }

            <h4 className="task-title">{ title }</h4>

            <div className="task-tags r-flex">
                { tags.map((tag, index) => ( <span key={index} className="task-tags__tag">{ tag }</span> )) }
            </div>
        </div>
    )
}