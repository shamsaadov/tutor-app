const initialState = {
  items: [],
  loading: false,
  buy: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "user/register/pending":
      return {
        ...state,
        signingUp: true,
        error: null,
      };
    case "user/register/fulfilled":
      return {
        ...state,
        signingUp: false,
      };
    case "user/register/rejected":
      return {
        ...state,
        signingUp: false,
        error: action.error,
      };

    // case "avatar/create/pending":
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    // case "avatar/create/fulfilled":
    //   return {
    //     ...state,
    //     loading: false,
    //     items: {
    //       ...state.items,
    //       avatar: action.payload,
    //     },
    //   };

    case "buy/access/fetch/pending":
      return {
        ...state,
        buy: true,
      };
    case "buy/access/fetch/fulfilled":
      return {
        ...state,
        buy: false,
        items: {
          ...state.items,
        },
      };

    default:
      return state;
  }
};

export default user;

export const fetchRegisterUsers = (data) => {
  return async (dispatch) => {
    dispatch({ type: "user/register/pending" });
    const response = await fetch("/api/user/register", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        surname: data.surname,
        phoneNumber: data.phone,
        gender: data.gender,
        login: data.login,
        password: data.pass,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await response.json();
    if (json.error) {
      dispatch({ type: "user/register/rejected", error: json.error });
    } else {
      dispatch({ type: "user/register/fulfilled", payload: json });
    }
  };
};

export const addUserToMentor = (mentorId, userId) => {
  return async (dispatch) => {
    dispatch({ type: "buy/access/fetch/pending" });
    try {
      const response = await fetch(`/api/${mentorId}/add/${userId}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=utf-8",
        },
      });
      const json = await response.json();
      dispatch({ type: "buy/access/fetch/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "buy/access/fetch/rejected", error: e.message });
    }
  };
};

export const balanceCandidate = () =>{
  return async (dispatch) =>{
    dispatch({type: 'balance/fetch/pending'})
    try {
      
    }catch (e) {
      
    }
  }
}

// export const uploadAvatar = (file) => {
//   return async (dispatch, getState) => {
//     const state = getState();
//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//
//       const response = await fetch(`/mentor/avatar`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${state.mentor.token}`,
//         },
//         body: formData,
//       });
//
//       const json = await response.json();
//       dispatch({ type: "avatar/create/fulfilled", payload: json.avatar });
//     } catch (e) {
//       console.log(e.message);
//     }
//   };
// };
