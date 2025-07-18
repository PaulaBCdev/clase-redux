import { useAppDispatch, useAppSelector } from ".";
import { authLogin, authLogout } from "./actions";
import { getIsLogged } from "./selectors";

export function useAuth() {
  return useAppSelector(getIsLogged);
}

export function useLogin() {
  const dispatch = useAppDispatch();
  return function () {
    return dispatch(authLogin());
  };
}

export function useLogout() {
  const dispatch = useAppDispatch();
  return function () {
    return dispatch(authLogout());
  };
}
