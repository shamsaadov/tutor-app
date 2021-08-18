const initialState = {
  items: [],
  loading: false,
  editing: false,
  deleting: false,
  adding: false,
  error: null,
};

const language = (state = initialState, action) => {
  switch (action.type) {
    case "load/languages/pending":
      return {
        ...state,
        loading: true,
      };
    case "load/languages/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case "load/languages/rejected":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default language;

export const fetchAllLanguage = () => {
  return async (dispatch) => {
    dispatch({ type: "load/languages/pending" });

    try {
      const response = await fetch("/api/language");
      const json = await response.json();

      dispatch({ type: "load/languages/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "load/languages/rejected", error: e.message });
    }
  };
};
