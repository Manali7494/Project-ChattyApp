export function changeUser(username){
    return{
        type: 'updateUser',
        payload: {name: username}
    }
}