import {createSlice} from '@reduxjs/toolkit';

const initialState = '';

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addFilter(state, action) {
      return action.payload;
    },
  },
})

// const filterReducer = (state = '', action) => {
//   switch (action.type) {
//     case 'SET_FILTER':
//       return action.payload
//
//     default:
//       return state
//   }
// };
//
// export const addFilter = (content) => {
//   return {
//     type: 'SET_FILTER',
//     payload: content,
//   };
// };

export const {addFilter} = filterSlice.actions;
export default filterSlice.reducer;