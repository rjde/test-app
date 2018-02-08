import fetch from 'isomorphic-fetch'

function usersData(data) {
  return {
    type: "USERS_DATA",
    usersData: data.items
  }
}

export function fetchUsers(username) {
  const URL = `https://api.github.com/search/users?q=${username}+in%3Alogin&per_page=10`

  return dispatch => {
    fetch(URL)
      .then(response => response.json())
      .then(data => dispatch(usersData(data)))
      .catch(function() {
        console.log("error");
    });
  }
}
