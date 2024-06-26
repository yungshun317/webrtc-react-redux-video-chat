import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import './index.css';
import store from "./store/store";
import App from './App';

ReactDOM.createRoot(document.querySelector("#root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);