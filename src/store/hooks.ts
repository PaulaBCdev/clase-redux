import { useAppDispatch, useAppSelector } from ".";
import { authLogin, authLogout } from "./actions";
import { getIsLogged } from "./selectors";

export function useAuth() {
  return useAppSelector(getIsLogged);
}

export function useLoginAction() {
  const dispatch = useAppDispatch();
  return function () {
    return dispatch(authLogin());
  };
}
// Esta funcion (useLogin()), primero crea una variable dispatch para no tener que escribir el pedazo de nombre de useAppDispatch; se va a usar para mandar a Redux la accion que queremos que se ejecute.
// La funcion devuelve otra funcion que hace que dispatch llame a la accion authLogin(), que esta en el archivo actions.ts, donde se ve que devuelve un type: "auth/login". Como ese es el type que recoge el case del switch de la funcion auth() (en el fichero reducer.ts), provoca que auth() devuelva un true; por lo tanto, la clave auth de rootReducer del fichero index.js (la variable que se crea con el combineReducers) ahora tiene el valor true, lo que indica que el usuario esta logeado.

export function useLogoutAction() {
  const dispatch = useAppDispatch();
  return function () {
    return dispatch(authLogout());
  };
}
