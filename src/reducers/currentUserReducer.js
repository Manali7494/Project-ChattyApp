export function currentUser(state={name:'John'}, action){
    const {type, payload} = action

    switch(type){
        case 'updateUser':
          return payload
        default:
          return state
    }
}