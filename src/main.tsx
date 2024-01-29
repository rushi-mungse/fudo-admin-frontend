import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App.tsx";
import "./index.css";
import "antd/dist/reset.css";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                token: { colorPrimary: import.meta.env.VITE_PRIMARY_COLOR },
                // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
            }}
        >
            <Provider store={store}>
                <QueryClientProvider client={new QueryClient()}>
                    <App />
                </QueryClientProvider>
            </Provider>
        </ConfigProvider>
    </React.StrictMode>
);
