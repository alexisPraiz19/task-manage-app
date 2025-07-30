export function open_options(e){ e.target.closest(".r-currentSelected").nextElementSibling.classList.toggle("open_options_list") }

//
export function select_option(e, { id, setTaskItem }){
    const target = e.target;
    
    if(id == "status"){
        if(e.target.type == "text" || e.target.type == "button") return;

        const allOptions = target.closest(".r-list_options").querySelectorAll(".list-item_input")
        const selected   = target.tagName == "INPUT" ? target : target.querySelector(".list-item_input");
        const value      = selected.value?.toLowerCase().split(" ").join("-");

        setTaskItem(prev => ({ ...prev, status: value }))
        allOptions.forEach(option =>{ option != selected ? option.checked = false : "" });
    }
}

//
export function handleAddTag(e, { setArrTags, setTaskItem }){
    const target = e.target,
          value  = target.previousElementSibling.value;
    
    if(value != ""){
        setTaskItem(prev => {
            let newState = { ...prev }; 
            newState.tags.push(value);
            return newState
        })

        target.previousElementSibling.value = ""
    }
}

//
export function handleDeleteTag(e){
    const target  = e.target,
          tagName = target.previousElementSibling.textContent;
}

//
import { apiKey } from "../../../../config"

export function randomImage({ setTaskItem }){
    const url = `https://api.unsplash.com/photos/random?client_id=${apiKey}&orientation=landscape`;

    fetch(url)
    .then(response => response.json())
    .then(data => setTaskItem(prev => ({ ...prev, photo: data.urls.small })))
    .catch(e => alert("image limit exceeded, please try again later"))
}

//
export function deleteImage({ setTaskItem }){ setTaskItem(prev => ({ ...prev, photo: null })) }

//
export function openTask(e){
    console.log(e.target)
}

//
export function save(e, { taskItem, setTaskItem, boardID }){
    const { title }    = taskItem;
    const boards       = JSON.parse(localStorage.getItem("boards"));
    const currentBoard = boards.find(board => board.id == boardID);
    let   tasks        = currentBoard.tasks;

    if(taskItem.id == "" && title != ""){
        setTaskItem(prev => {
            let newState = { ...prev }
            newState.id  = tasks.length + 1;
            tasks.push(newState);

            localStorage.setItem("boards", JSON.stringify(boards));

            return newState
        });
    }
    else if(taskItem.id != "" && title != ""){
        setTaskItem(prev => {
            let newState = { ...prev };
            const replaceIndex = tasks.findIndex(task => task.id == taskItem.id);
            tasks.splice(replaceIndex, 1, newState)

            localStorage.setItem("boards", JSON.stringify(boards));

            return newState
        });
    }

    document.getElementById("task-details").close()
} 