import { combineReducers } from 'redux'

const loadUsersData = (state = [], action) => {
  if(action.type === "USERS_DATA") {
    return action.usersData
  }
  return state
}

const rootReducer = combineReducers({
  usersData: loadUsersData,
})

export default rootReducer