import DialogWrapper from "../../../common/DialogWrapper"
import List from "./List"

import { IconClose, IconDone } from "../../../assets/Icons"
import { statuses, tags } from "../../../assets/mocks"
import { save, randomImage, deleteImage } from "./handleTaskModal"
import { useTaskContext } from "../../../context/TaskContext"
/---/

export default function TaskDetails(){
    const { taskItem, setTaskItem, boardID } = useTaskContext();

    return(
        <DialogWrapper>
            <dialog className="task-details_modal r-modal" id="task-details">
                <h2 className="task-details_modal__title r-modal_title r-flex">
                    Task Details
                
                    <button type="button" className="r-defaultBTN r-flex" onClick={(e) => e.target.closest("#task-details").close()}>
                        <IconClose/>
                    </button>
                </h2>
                
                {/* Imagen */}
                <div className="task-details_modal__image-container">
                    <div className="image">
                        { taskItem.photo != null ? <img src={taskItem.photo} alt="background image" class="background-image"/> : "No cover photo" }
                    </div>

                    <div className="task-details_modal__image-overlay r-flex">
                        <button type="button" className="r-defaultBTN" onClick={() => randomImage({ setTaskItem })}>Random Cover</button>
                        <button type="button" className="r-defaultBTN" onClick={() => deleteImage({ setTaskItem })}>Remove</button>
                    </div>
                </div>
                
                {/* Nombre */}
                <label className="task-details_modal__label">
                    <span className="r-fieldName">Task Name</span>
                    <input type="text" name="taskName" placeholder="Today I have to do this..." className="r-fieldFocus"
                        defaultValue={ taskItem.title }
                        onChange={(e) => setTaskItem(prev => ({...prev, title: e.target.value}))}
                    />
                </label>
                
                {/* Estado */}
                <List title="Status" arr={ statuses } addTag={ null } id="status"/>
                <List title="Tags" arr={ taskItem.tags } addTag={ true } className="task-details_modal__tagsBox" id="tags"/>
                
                {/* Guardar */}
                <div className="task-details_modal__BTNS r-flex">
                    <button type="button" className="r-defaultBTN r-flex" onClick={(e) => save(e, { taskItem, setTaskItem, boardID })}>
                        <span>Save</span>
                        <IconDone/>
                    </button>

                    <button type="button" className="r-defaultBTN" onClick={(e) => e.target.parentElement.parentElement.close()}>
                        Cancel
                    </button>
                </div>
            </dialog>
        </DialogWrapper>
    )
}