export function changeUser(username){
    return{
        type: 'updateUser',
        payload: {name: username}
    }
}


export function addMessage(message){
    return{
        type: 'addMessage',
        payload: message
    }
}