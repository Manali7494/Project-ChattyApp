export function messages(state = [], action=null){
    const {type, payload} = action

    switch(type){
        case 'addMessage':
          return state.concat(payload);

        case 'default':
          return state
    }
}