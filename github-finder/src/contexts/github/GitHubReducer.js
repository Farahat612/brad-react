// Desc: Actions Reducer for the GitHub context ---> called in the GitHub context
const gitHubReducer = (state, action) => {
  switch (action.type) {
    // Getting users from the search
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false,
      }

    // Getting a single user and their repos
    case 'GET_USER_AND_REPOS':
      return {
        ...state,
        user: action.payload.user,
        repos: action.payload.repos,
        loading: false,
      }

    // Clearing users search results after pressing the clear button
    case 'CLEAR_USERS':
      return {
        ...state,
        users: [],
        loading: false,
      }

    // Set loading to true when fetching data
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      }

    // Default case
    default:
      return state
  }
}

export default gitHubReducer
