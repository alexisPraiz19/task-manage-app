export function handleSubmit(e, { newBoardProps, setNewBoardProps, setBoardsList }){
    e.preventDefault();
    const target = e.target;

    if(newBoardProps.boardName != "" && newBoardProps.emoji != ""){
        const boards = [... JSON.parse(localStorage.getItem("boards"))];
        boards.push(newBoardProps);

        target.reset();
        target.closest(".new-board-modal").close();

        setBoardsList(prev => {
            const newState = [ ...prev ];
            newState.push(newBoardProps);

            return newState
        })

        localStorage.setItem("boards", JSON.stringify(boards))

        setTimeout(()=>{
            setNewBoardProps({
                id: boards.length,
                name: "",
                emoji: "",
                tasks: []
            })
        }, 1500);
    }
}