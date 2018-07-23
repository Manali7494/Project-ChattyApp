export function currentUser(state={name:'Anonymous'}, action){
    const {type, payload} = action

    switch(type){
        case 'updateUser':
          return payload
        default:
          return state
    }
}