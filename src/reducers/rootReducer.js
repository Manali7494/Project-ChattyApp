import { combineReducers } from 'redux'

import { currentUser } from './currentUserReducer'
import { messages } from './messagesReducer'
const rootReducer = combineReducers({
    currentUser,
    messages,
});

export default rootReducer;