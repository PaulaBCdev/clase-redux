import { combineReducers, createStore } from "redux";
import * as reducers from "./reducer.ts";
import { devToolsEnhancer } from "@redux-devtools/extension";
import { useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers(reducers);

export default function configureStore(
  preloadedState: Partial<reducers.State>,
) {
  const store = createStore(
    rootReducer,
    preloadedState as never, // me dice si de base estoy logeada o no
    /* // @ts-expect-error: import devtools extension
    window.REDUX_DEVTOOLS_EXTENSION &&
      // @ts-expect-error: import devtools extension
      window.REDUX_DEVTOOLS_EXTENSION(), */
    devToolsEnhancer(),
  );
  return store;
}

export type AppStore = ReturnType<typeof configureStore>; // Tipo del store (lo que retorna configureStore)
export type AppGetState = AppStore["getState"]; // Tipo de la funcion .getState() del store
export type RootState = ReturnType<AppGetState>; // Tipo del estado completo del store
export type AppDispatch = AppStore["dispatch"]; // Tipo de la funcion dispatch() del store

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
