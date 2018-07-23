
export function addMessage(message){
    return{
        type: 'addMessage',
        payload: message
    }
}

export function changeUser(username){
    return{
        type: 'updateUser',
        payload: {name: username}
    }
}


export function returnConnection(number){
    return{
        type: 'showResult',
        payload: number
    }
}
