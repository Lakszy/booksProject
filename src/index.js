import React from 'react';
// import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store }  from './Store/index';
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const container = document.getElementById("root");
const root = createRoot(container);


root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                    <App />
            </Provider>

        </QueryClientProvider>
    </React.StrictMode>
);