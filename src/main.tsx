import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import storage from "./utils/storage.ts";
import { setAuthorizationHeader } from "./api/client.ts";
import { createBrowserRouter, RouterProvider } from "react-router";
import ErrorBoundary from "./components/errors/error-boundary.tsx";
import configureStore from "./store/index.ts";
import { Provider } from "react-redux";

const accessToken = storage.get("auth");
if (accessToken) {
  setAuthorizationHeader(accessToken);
}

const router = createBrowserRouter([{ path: "*", element: <App /> }]);
//                                 esto quiere decir: con cualquier ruta, renderizas el componente App

const store = configureStore({ auth: !!localStorage }, router);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
);

// !!accessToken transforma la variable accessToken se transforma en booleano
