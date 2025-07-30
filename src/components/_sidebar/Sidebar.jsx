import { useState } from "react"
import { getStorage } from "../../features/_localStorage/setStorage"
import { useTaskContext } from "../../context/TaskContext"
import { IconClose, IconAdd, IconSoon, IconMoon, IconMenu } from "../../assets/Icons"
/---/

export default function Sidebar(){
    const { setBoardID, boardsList } = useTaskContext();

    return(
        <aside className="sidebar">
            <button type="button" title="close menu" className="sidebar-closeBTN r-defaultBTN r-flex" onClick={(e) => e.target.parentElement.classList.toggle("thin-sidebar")}>
                <IconClose/>
                <IconMenu/>
            </button>

            <div className="sidebar-boards_links r-grid" onClick={(e) => {
                if(e.target.tagName != "BUTTON"){
                    const target = e.target.closest(".sidebar-boards_links__item");
                    const items  = target.parentElement.querySelectorAll(".sidebar-boards_links__item");
                
                    items.forEach(item =>{
                        item != target 
                        ? item.querySelector(".item-input").checked = false & item.querySelector(".item-input").classList.remove("active-board")
                        : setBoardID(Number(item.querySelector(".item-input").value)) & item.querySelector(".item-input").classList.add("active-board");
                    });
                }
            }}>
                {
                    boardsList.map(({ id, emoji, name }) => (
                        <label key={id} className="sidebar-boards_links__item r-flex">
                            <input type="radio" name={`board-${id}`} value={ id } className={`${id == 0 ? "item-input active-board" : "item-input"}`} checked={ id == 0 ? true : false } />
                            <img src={`/emojis/${ emoji }.png`} alt="emoji-board" className="item-emoji"/>
                            <span className="item-boardName">{ name }</span>
                        </label>
                    ))
                }

                <button type="button" title="add new board" className="sidebar-addBoard_BTN r-defaultBTN r-flex" onClick={(e) => {
                    document.getElementById("new-board-modal").showModal();
                }}>
                    <span className="r-flex"> <IconAdd/> </span>
                    <span>Add New Board</span>
                </button>
            </div>

            <div className="sidebar-dark_light__BTNS r-flex" onClick={(e) => {
                document.body.classList.toggle("light-mode");
                e.target.closest(".sidebar-dark_light__BTNS").classList.toggle("sidebar-dark_light__BTNS__active");
            }}>
                <button type="button" className="dark-mode r-defaultBTN r-flex">
                    <IconMoon/>
                    <span>Dark</span>
                </button>

                <button type="button" className="light-mode r-defaultBTN r-flex">
                    <IconSoon/>
                    <span>Light</span>
                </button>
            </div>
        </aside>
    )
}