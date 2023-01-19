import { defaults } from "pg"
import { UserActions } from "./authaction"

export interface userState{
    username: string
}
const initalState:userState ={
    'username': ""
}

export const userReducer = (oldsState:userState = initalState, action:UserActions):userState =>{
    switch(action.type){
        case'@@SETUSER':
        return action.user
    
    defaults:
    return oldsState
    } 
}

