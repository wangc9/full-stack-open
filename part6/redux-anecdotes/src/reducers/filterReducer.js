const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload

    default:
      return state
  }
};

export const addFilter = (content) => {
  return {
    type: 'SET_FILTER',
    payload: content,
  };
};

export default filterReducer;