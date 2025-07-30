import { boards } from "../../assets/mocks"

export function setStorage(){
    localStorage.setItem("boards", JSON.stringify(boards))
}

export function getStorage(){
    return JSON.parse(localStorage.getItem("boards"))
}