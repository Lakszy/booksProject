import React from 'react';
// import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store }  from './Store/index';
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);


root.render(
    <React.StrictMode>
        <Provider store={store}>
                <App />
        </Provider>
    </React.StrictMode>
);