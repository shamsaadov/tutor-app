import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import language from "./features/language.reducer";
import mentor from "./features/mentor.reducer";
import user from "./features/user.reducer";
import application from "./features/application";

const mls = localStorage.getItem("mentor-reducer");
const uls = localStorage.getItem("user-reducer");
const appls = localStorage.getItem("application");

const preloadedStore = {
  mentor: mls ? JSON.parse(mls) : undefined,
  user: uls ? JSON.parse(uls) : undefined,
  application: appls ? JSON.parse(appls) : undefined,
};

export const store = createStore(
  combineReducers({ language, mentor, user, application }),
  preloadedStore,
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => {
  const { mentor, user, application } = store.getState();

  localStorage.setItem("mentor-reducer", JSON.stringify(mentor));
  localStorage.setItem("user-reducer", JSON.stringify(user));
  localStorage.setItem("application", JSON.stringify(application));
});
