import { useState } from "react"
import { emojis } from "../../../assets/mocks"
import { IconClose, IconDone } from "../../../assets/Icons"
import { handleSubmit } from "./handleBoardModal"
import { useTaskContext } from "../../../context/TaskContext"
import DialogWrapper from "../../../common/DialogWrapper"
/---/

export default function NewBoardModal(){
    const { setBoardsList } = useTaskContext();
    const [newBoardProps, setNewBoardProps] = useState({
        id: JSON.parse(localStorage.getItem("boards")).length,
        name: "",
        emoji: "",
        tasks: []
    });

    return (
        <DialogWrapper>
            <dialog className="new-board-modal r-modal" id="new-board-modal">
                <h2 className="new-board-modal__title r-modal_title r-flex">
                    New board

                    <button type="button" className="r-defaultBTN r-flex" onClick={(e) => e.target.closest(".new-board-modal").close()}>
                        <IconClose/>
                    </button>
                </h2>

                <form method="dialog" className="new-board-modal__form r-grid" onSubmit={(e) => handleSubmit(e, { newBoardProps, setNewBoardProps, setBoardsList })}>
                    <label className="new-board-modal__form__label">
                        <span className="r-fieldName">Board Name:</span>
                        <input type="text" name="boardName" placeholder="e.g: Default Board" required className="r-fieldFocus" onChange={(e) => setNewBoardProps(
                            prev => ({
                                ...prev,
                                name: e.target.value
                            })
                        )}/>
                    </label>

                    <div className="new-board-modal__form__emojis-container">
                        <span className="r-fieldName">Logo</span>

                        <div className="emojis-options r-flex" onClick={(e) =>{
                            const target   = e.target;
                            const selected = target.querySelector(".emoji-option_input");
                            const options  = target.closest(".emojis-options").querySelectorAll(".emoji-option_input");

                            if(selected != null)
                                options.forEach(option => option.value != selected.value ? option.checked = false : "")
                        }}>
                            {
                                emojis.map((emoji) => (
                                    <label key={emoji} className="emoji-option r-flex">
                                        <input type="radio" name={`emoji_${emoji}`} className="emoji-option_input" value={emoji} onChange={(e) => setNewBoardProps(
                                            prev => ({
                                                ...prev,
                                                emoji: e.target.value
                                            })
                                        )}/>
                                        <img src={`/emojis/${emoji}.png`} alt={`Emoji ${emoji}`} />
                                    </label>
                                ))
                           }
                        </div>
                    </div>
                
                    <div className="new-board-dialog__form__BTNS r-flex">
                        <button type="submit" className="r-defaultBTN r-flex">
                            <span>Create Board</span>
                            <IconDone/>
                        </button>

                        <button type="button" className="r-defaultBTN" onClick={() => document.getElementById("new-board-modal").close()}>Cancel</button>
                    </div>
                </form>
            </dialog>
        </DialogWrapper>
    );
}