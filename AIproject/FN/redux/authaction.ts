import {userState} from "./authreducer"

export function setUser(user:userState){
    return{
        type:'@@SETUSER' as '@@SETUSER',
        user
    } 
}
export type UserActions = ReturnType<typeof setUser>