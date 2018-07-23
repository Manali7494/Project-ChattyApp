export function connection(state=0, action){
    const {type, payload} = action

    switch(type){
        case 'showResult':
          return payload
        default:
          return state
    }
}