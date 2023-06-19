const initialState = {
  good: 0,
  ok: 0,
  bad: 0
};

const counterReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case 'GOOD':
      const originGood = state.good;
      return {
        ...state,
        good: originGood + 1,
      }
    case 'OK':
      const originOk = state.ok;
      return {
        ...state,
        ok: originOk + 1,
      }
    case 'BAD':
      const originBad = state.bad;
      return {
        ...state,
        bad: originBad + 1,
      }
    case 'ZERO':
      return {
        ...state,
        good: 0,
        ok: 0,
        bad: 0,
      }
    default: return state
  }
}

export default counterReducer;
