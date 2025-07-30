let dragged = null;

export function draggable(e){ 
    dragged = e.target;

    document.querySelectorAll(".main-column_tasks__task").forEach(task => task != dragged ? task.style = "opacity: .5; pointer-events: none;" : "")

    const dragGhost       = document.createElement('div');
    dragGhost.textContent = 'Dragging...';
    dragGhost.style       = "position: absolute; padding: 8px 12px; background: var(--black-100); color: var(--white-100); font-size: 14px; border-radius: 5px"
    document.body.appendChild(dragGhost);
    e.dataTransfer.setDragImage(dragGhost, 10, 10);
}

export function dragOver(e){ e.preventDefault() }

export function dropTask(e, { boardID, setBoardsList }){
    e.preventDefault();
    const target = e.target.closest(".main-column"); // zona donde se puden arrojar items (columna)
    document.querySelectorAll(".main-column_tasks__task").forEach(task => task.style = "opacity: 1; pointer-events: unset")
    
    if(target){
        const boards       = JSON.parse(localStorage.getItem("boards"));
        const currentBoard = boards.find(board => board.id == boardID);
        let   tasks        = currentBoard.tasks;

        tasks.find(task => task.id == dragged.dataset.id).status = target.dataset.column;
        localStorage.setItem("boards", JSON.stringify(boards));
        setBoardsList(boards);
    }
}