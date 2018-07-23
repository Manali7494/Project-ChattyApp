export function messages(state=['First Message'], action){
    const {type, payload} = action

    switch(type){
        case 'addMessage':
          return state.concat(payload);
        default:
          return state
    }
}