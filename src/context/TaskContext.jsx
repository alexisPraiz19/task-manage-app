import { createContext, useState, useContext } from "react"
import { getStorage } from "../features/_localStorage/setStorage"

export const TaskContext = createContext({});

export default function TaskContextProvider({ children }){
    const [boardsList, setBoardsList] = useState(getStorage());
    const [boardID, setBoardID]   = useState(0);
    const [taskItem, setTaskItem] = useState({ id: "", title: "", status: "", photo: null, tags: [] });
    const [currentSelected, setCurrentSelected] = useState({
        text: taskItem.status,
        color: "var(--blue)"
    });

    return(
        <TaskContext
            value={{
                boardsList, setBoardsList,
                boardID, setBoardID,
                taskItem, setTaskItem,
                currentSelected, setCurrentSelected
            }}
        >
            { children }
        </TaskContext>
    )
}

export const useTaskContext = () => useContext(TaskContext)