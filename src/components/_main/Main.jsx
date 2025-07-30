import Column from "./Culumn"
import { useTaskContext } from "../../context/TaskContext"
/---/

export default function Main(){
    const { boardID } = useTaskContext();
    const board = JSON.parse(localStorage.getItem("boards")).find(board => board.id == boardID);
    const filterTask = (filter) => board.tasks.filter(task => task.status == filter);

    return (
        <main className="main r-grid">
            <Column
                theme       = "var(--blue)"
                name        = "Backlog"
                column      = "backlog"
                tasks       = {filterTask("backlog")}
                BTN_addTask = { true }
            />
            <Column
                theme     = "var(--cream-yellow)"
                name      =  "In Progress"
                column    = "in-progress"
                tasks     = {filterTask("in-progress")}
            />
            <Column
                theme     = "var(--pink)" 
                name      = "In Review"
                column    = "in-review"
                tasks     = {filterTask("in-review")}
            />

            <Column
                theme     = "var(--green)" 
                name      = "Completed"
                column    = "completed"
                tasks     = {filterTask("completed")}
            />
        </main>
    );
}