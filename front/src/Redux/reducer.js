const initialState = {
  Contacts: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "deletePost": {
      const newArr = [...state.Contacts].filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        Contacts: newArr,
      };
    }
    case "UpdateData": {
      const newArr = [...state.Contacts];
      const index = newArr.findIndex((item) => item.id === action.payload.id);
      newArr.splice(index, 1, action.payload);
      return {
        ...state,
        Contacts: newArr,
      };
    }
    case "PostData": {
      return {
        ...state,
        Contacts: [...state.Contacts, action.payload],
      };
    }
    case "FetchData": {
      return {
        ...state,
        Contacts: [...state.Contacts, action.payload],
      };
    }

    default:
      return state;
  }
};
export default reducer;
