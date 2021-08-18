const initialState = {
  items: [],
  currentMentor: [],
  currentAvatarItem: [],
  loading: false,
  editing: false,
  searching: "",
  error: null,
  deleting: false,
};

const mentor = (state = initialState, action) => {
  switch (action.type) {
    case "mentor/fetch/pending":
      return {
        ...state,
        loading: true,
      };
    case "mentor/fetch/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case "mentor/fetch/rejected":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case "mentor/register/pending":
      return {
        ...state,
        signingUp: true,
        error: null,
      };
    case "mentor/register/fulfilled":
      return {
        ...state,
        signingUp: false,
      };
    case "mentor/register/rejected":
      return {
        ...state,
        signingUp: false,
        error: action.error,
      };

    case "mentor/profile/fetch/pending":
      return {
        ...state,
        loading: true,
      };
    case "mentor/profile/fetch/fulfilled":
      return {
        ...state,
        loading: false,
        currentMentor: action.payload,
      };
    case "mentor/profile/fetch/rejected":
      return {
        ...state,
        error: action.error,
      };

    case "mentor/language/fetch/pending":
      return {
        ...state,
        loading: true,
      };
    case "mentor/language/fetch/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case "mentor/language/fetch/rejected":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case "all/mentor/fetch/pending":
      return {
        ...state,
        loading: true,
      };
    case "all/mentor/fetch/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case "all/mentor/fetch/rejected":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case "searching":
      return {
        ...state,
        searching: action.payload,
      };

    case "account/delete/fetch/pending":
      return {
        ...state,
        deleting: true,
      };
    case "account/delete/fetch/fulfilled":
      return {
        ...state,
        deleting: false,
        candidate: state.candidate._id,
      };

    // case "mentor/update/pending":
    //   return {
    //     ...state,
    //     editing: true,
    //   };
    // case "mentor/update/fulfilled":
    //   return {
    //     ...state,
    //     editing: false,
    //     items: state.items.map((item) => {
    //       if (item._id === action.payload.id) {
    //         return {
    //           ...item,
    //           ...action.payload.data,
    //         };
    //       }
    //       return item;
    //     }),
    //   };
    // case "mentor/update/rejected":
    //   return {
    //     ...state,
    //     error: action.error,
    //   };

    default:
      return state;
  }
};
export default mentor;

export const deleteAccount = (id) => {
  return async (dispatch) => {
    dispatch({ type: "account/delete/fetch/pending" });
    try {
      await fetch(`/mentor/${id}/delete`, {
        method: "DELETE",
      });
      dispatch({ type: "account/delete/fetch/fulfilled", payload: id });
    } catch (e) {
      dispatch({ type: "account/delete/fetch/rejected" });
    }
  };
};

export const fetchRandomMentor = () => {
  return async (dispatch) => {
    dispatch({ type: "mentor/fetch/pending" });
    try {
      const response = await fetch("/mentors");
      const json = await response.json();
      dispatch({ type: "mentor/fetch/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "mentor/fetch/rejected", error: e.message });
    }
  };
};

export const fetchAllMentor = () => {
  return async (dispatch) => {
    dispatch({ type: "all/mentor/fetch/pending" });
    try {
      const response = await fetch("/mentor/page");
      const json = await response.json();
      dispatch({ type: "all/mentor/fetch/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "all/mentor/fetch/rejected", error: e.message });
    }
  };
};

export const fetchMentorByLanguageId = (id) => {
  return async (dispatch) => {
    dispatch({ type: "mentor/language/fetch/pending" });
    try {
      const response = await fetch(`/mentor/${id}/language`);
      const json = await response.json();
      dispatch({ type: "mentor/language/fetch/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "mentor/language/fetch/rejected", error: e.toString() });
    }
  };
};

export const fetchRegisterMentor = (data) => {
  return async (dispatch) => {
    dispatch({ type: "mentor/register/pending" });

    const response = await fetch("/mentor/register", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        surname: data.surname,
        phoneNumber: data.phone,
        gender: data.gender,
        login: data.login,
        password: data.pass,
        language: data.language,
        payment: data.payment,
        avatar: data.avatar,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await response.json();

    if (json.error) {
      dispatch({ type: "mentor/register/rejected", error: json.error });
    } else {
      dispatch({ type: "mentor/register/fulfilled", payload: json });
    }
  };
};

export const fetchMentorProfile = (id) => {
  return async (dispatch) => {
    dispatch({ type: "mentor/profile/fetch/pending" });
    try {
      const response = await fetch(`/mentor/${id}/profile`);
      const json = await response.json();

      dispatch({ type: "mentor/profile/fetch/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "mentor/profile/fetch/rejected", error: e.message });
    }
  };
};

export const searching = (data) => {
  return { type: "searching", payload: data };
};

export const selectMentor = (state) => {
  const { mentor } = state;
  return mentor.items.filter((item) => {
    return item.name.toLowerCase().indexOf(mentor.searching) > -1;
  });
};

// export const fetchUpdateMentor = (data) => {
//   return async (dispatch) => {
//     dispatch({ type: "mentor/update/pending" });
//     try {
//       await fetch(`/mentor/${data.id}/update`, {
//         method: "PATCH",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify({
//           name: data.name,
//           surname: data.surname,
//           phoneNumber: data.phone,
//           login: data.login,
//         }),
//       });
//
//       dispatch({ type: "mentor/update/fulfilled", payload: data });
//     } catch (e) {
//       dispatch({ type: "mentor/update/rejected", error: e.toString() });
//     }
//   };
// };
