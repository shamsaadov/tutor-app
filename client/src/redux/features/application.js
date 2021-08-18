const initialState = {
  signingUp: false,
  signingIn: false,
  error: null,
  token: null,
  role: null,
  candidate: null,
};

const application = (state = initialState, action) => {
  switch (action.type) {
    case "mentor/login/pending":
      return {
        ...state,
        signingIn: true,
        error: null,
      };
    case "mentor/login/fulfilled":
      return {
        ...state,
        signingIn: false,
        token: action.payload.token,
        role: action.payload.role,
        candidate: action.payload.candidate,
        error: null,
      };
    case "mentor/login/rejected":
      return {
        ...state,
        signingIn: false,
        error: action.error,
      };

    case "user/login/pending":
      return {
        ...state,
        signingIn: true,
        error: null,
      };
    case "user/login/fulfilled":
      return {
        ...state,
        signingIn: false,
        token: action.payload.token,
        role: action.payload.role,
        candidate: action.payload.candidate,
        error: null,
      };
    case "user/login/rejected":
      return {
        ...state,
        signingIn: false,
        error: action.error,
      };

    case "mentor/update/pending":
      return {
        ...state,
        editing: true,
      };
    case "mentor/update/fulfilled":
      return {
        ...state,
        editing: false,
        candidate: { ...action.payload },
      };
    case "mentor/update/rejected":
      return {
        ...state,
        error: action.error,
      };

    case "user/update/pending":
      return {
        ...state,
        editing: true,
      };
    case "user/update/fulfilled":
      return {
        ...state,
        editing: false,
        candidate: { ...action.payload },
      };
    case "user/update/rejected":
      return {
        ...state,
        editing: false,
        error: action.error,
      };

    case "token/remove/fulfilled":
      return {
        ...state,
        token: null,
        role: null,
      };

    case "avatar/create/fulfilled":
      return {
        ...state,
        loading: false,
        candidate: {
          ...state.candidate,
          avatar: action.payload,
        },
      };

    default:
      return state;
  }
};

export default application;

export const fetchUpdateUser = (data) => {
  return async (dispatch) => {
    dispatch({ type: "user/update/pending" });

    try {
      const response = await fetch(`/user/${data.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: data.newName,
          surname: data.newSurname,
          phoneNumber: data.newPhone,
          login: data.newLogin,
        }),
      });

      const json = await response.json();

      dispatch({ type: "user/update/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "user/update/rejected", error: e.toString() });
    }
  };
};

export const fetchUpdateMentor = (data) => {
  return async (dispatch) => {
    dispatch({ type: "mentor/update/pending" });
    try {
      const response = await fetch(`/mentor/${data.id}/update`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: data.newName,
          surname: data.newSurname,
          phoneNumber: data.newPhone,
          login: data.newLogin,
        }),
      });

      const json = await response.json();

      dispatch({ type: "mentor/update/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "mentor/update/rejected", error: e.toString() });
    }
  };
};

export const fetchLoginMentor = (data) => {
  return async (dispatch) => {
    dispatch({ type: "mentor/login/pending" });

    const response = await fetch("/mentor/login", {
      method: "POST",
      body: JSON.stringify({
        login: data.login,
        password: data.password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const json = await response.json();

    if (json.error) {
      dispatch({ type: "mentor/login/rejected", error: json.error });
    } else {
      dispatch({ type: "mentor/login/fulfilled", payload: json });
    }
  };
};

export const fetchLoginUser = (data) => {
  return async (dispatch) => {
    dispatch({ type: "user/login/pending" });

    const response = await fetch("/user/login", {
      method: "POST",
      body: JSON.stringify({
        login: data.login,
        password: data.password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const json = await response.json();

    if (json.error) {
      dispatch({ type: "user/login/rejected", error: json.error });
    } else {
      dispatch({ type: "user/login/fulfilled", payload: json });
    }
  };
};

export const roleAndTokenRemove = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("candidate");
  return (dispatch) => {
    dispatch({
      type: "token/remove/fulfilled",
    });
  };
};

export const uploadAvatar = (file) => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(`/mentor/avatar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${state.application.token}`,
        },
        body: formData,
      });

      const json = await response.json();

      dispatch({ type: "avatar/create/fulfilled", payload: json.avatar });
    } catch (e) {
      console.log(e.message);
    }
  };
};
