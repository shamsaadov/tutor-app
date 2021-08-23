import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from './redux/configureStore';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
