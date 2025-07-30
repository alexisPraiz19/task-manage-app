import Sidebar from "./components/_sidebar/Sidebar"
import Main from "./components/_main/Main"
import NewBoardModal from "./features/dialog/_newBoard/NewBoardModal"
import TaskDetails from "./features/dialog/_taskDetails/TaskDetails"
import TaskContextProvider from "./context/TaskContext"
import { setStorage } from "./features/_localStorage/setStorage"

if(localStorage.getItem("boards") == null) setStorage();

export default function App(){
    return(
        <>
            <TaskContextProvider>
                <Sidebar/>
                <Main/>
                <NewBoardModal/>
                <TaskDetails/>
            </TaskContextProvider>
        </>
    )
}