import { combineReducers } from 'redux'

import { currentUser } from './currentUserReducer'
import { messages } from './messagesReducer'
import { connection } from './connectionReducer'
 const rootReducer = combineReducers({
    currentUser,
    messages,
    connection
});

export default rootReducer;