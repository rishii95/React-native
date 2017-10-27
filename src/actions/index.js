export const LOGIN_SUCCESS="LOGIN_SUCCESS";
export const LOGIN_ERROR="LOGIN_ERROR";
export const LOGOUT="LOGOUT";


export function login(userCredentials){
    console.log("hi");
    if(userCredentials.username=="rishi"&&userCredentials.password=="rishi")
    return{
        type:LOGIN_SUCCESS
    }
    else
    return{
        type:LOGIN_ERROR
    }
}
export function logout(){
    return{
        type:LOGOUT
    }
}