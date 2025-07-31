import { combineReducers, createStore, applyMiddleware } from "redux";
import * as reducers from "./reducer.ts";
import { composeWithDevTools } from "@redux-devtools/extension";
import { useDispatch, useSelector } from "react-redux";
import * as thunk from "redux-thunk";
import type { Actions } from "./actions.ts";
import * as tweets from "../pages/tweets/service.ts";
import * as auth from "../pages/auth/service.ts";
import type { createBrowserRouter } from "react-router";

const rootReducer = combineReducers(reducers);

type Router = ReturnType<typeof createBrowserRouter>;

type ExtraArgument = {
  api: { auth: typeof auth; tweets: typeof tweets };
  router: Router;
};

// Ejemplo de middleware "hecho a mano" para redirigir en caso de error
// @ts-expect-error: any
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const failureRedirects = (router: Router) => (store) => (next) => (action) => {
  const result = next(action);

  if (!action.type.endsWith("/rejected")) {
    return result;
  }

  if (action.payload.status === 404) {
    router.navigate("/404");
  }

  if (action.payload.status === 401) {
    router.navigate("/login");
  }
};

export default function configureStore(
  preloadedState: Partial<reducers.State>,
  router: Router,
) {
  const store = createStore(
    rootReducer,
    preloadedState as never, // me dice si de base estoy logeada o no
    /* // @ts-expect-error: import devtools extension
    window.REDUX_DEVTOOLS_EXTENSION &&
      // @ts-expect-error: import devtools extension
      window.REDUX_DEVTOOLS_EXTENSION(), */
    composeWithDevTools(
      applyMiddleware(
        thunk.withExtraArgument<reducers.State, Actions, ExtraArgument>({
          api: { tweets, auth }, // El ExtraArgument lo vamos a utilizar para que las llamadas a la api (para traer los tweets la primera vez y para la autenticacion) se haga a traves de una accion con thunk, quitandole asi mas trabajo a los componentes.
          // En este caso, como vemos en el type de ExtraArgument, al tener auth y tweets los tipos que hay en sus respectivos archivos de service.ts, podremos tener acceso directo a las funciones de login y logout del service.ts del auth, y a las funciones de getTweet, getLatestTweets y createTweet del service.ts de tweets
          router, // Con el ExtraArgument tambien vamos a tener acceso a las rutas de react. Para ello, hemos modificado ligeramente el archivo main.tsx para crear nuestro propio BrowserRouter y poder usarlo donde lo necesitemos
        }),
        failureRedirects(router),
      ),
    ),
  );
  return store;
}

export type AppStore = ReturnType<typeof configureStore>; // Tipo del store (lo que retorna configureStore)
export type AppGetState = AppStore["getState"]; // Tipo de la funcion .getState() del store
export type RootState = ReturnType<AppGetState>; // Tipo del estado completo del store
export type AppDispatch = AppStore["dispatch"]; // Tipo de la funcion dispatch() del store

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

// esto permite que los thunks puedan tener los tipos del store (para que entiendan la forma del estado global)
export type AppThunk<ReturnType = void> = thunk.ThunkAction<
  ReturnType,
  RootState,
  ExtraArgument,
  Actions
>;
