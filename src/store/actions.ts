import type { AppThunk } from ".";
import { login } from "../pages/auth/service";
import type { Credentials } from "../pages/auth/types";
import type { Tweet } from "../pages/tweets/types";

type AuthLoginPending = {
  type: "auth/login/pending";
};

type AuthLoginFulfilled = {
  type: "auth/login/fulfilled";
};

type AuthLoginRejected = {
  type: "auth/login/rejected";
  payload: Error;
};

type AuthLogout = {
  type: "auth/logout";
};

type TweetsLoaded = {
  type: "tweets/loaded";
  payload: Tweet[];
};

type TweetsCreated = {
  type: "tweets/created";
  payload: Tweet;
};

type UiResetError = {
  type: "ui/reset-error";
};

export const authLoginPending = (): AuthLoginPending => ({
  type: "auth/login/pending",
});

export const authLoginFulfilled = (): AuthLoginFulfilled => ({
  type: "auth/login/fulfilled",
});

export const authLoginRejected = (error: Error): AuthLoginRejected => ({
  type: "auth/login/rejected",
  payload: error,
});

// esta accion se va a encargar de juntar en un mismo sitio los authLogin fulfilled, pending y rejected
export function authLogin(credentials: Credentials): AppThunk<Promise<void>> {
  // esta funcion me va a devolver un thunk, que a su vez me va a devolver una promesa de void (nada)
  return async function (dispatch) {
    dispatch(authLoginPending());
    try {
      await login(credentials);
      dispatch(authLoginFulfilled());
    } catch (error) {
      if (error instanceof Error) {
        dispatch(authLoginRejected(error));
      }
      throw error;
    }
  };
}
// IMPORTANTE: fijate que esta accion devuelve una funcion. Las acciones lo que suelen devolver son objetos, ya que es lo que pide dispatch. Sin embargo, cuando se ejecute authLogin(), el thunk (middleware) va a ver que es una funcion y la va a ejecutar antes de pasarsela al dispatch (de hecho, fijate que hace los dispatch dentro de la funcion, y a cada dispatch le pasamos el objeto debido dependiendo del momento: empieza con un pending; manda las credenciales al servicio del login y si son correctas hace dispatch de fulfilled, y si son erroneas, hace dispatch de rejected)

export const authLogout = (): AuthLogout => ({
  type: "auth/logout",
});

export const tweetsLoaded = (tweets: Tweet[]): TweetsLoaded => ({
  type: "tweets/loaded",
  payload: tweets,
});

export const tweetsCreated = (tweet: Tweet): TweetsCreated => ({
  type: "tweets/created",
  payload: tweet,
});

export const uiResetError = (): UiResetError => ({
  type: "ui/reset-error",
});

export type Actions =
  | AuthLoginPending
  | AuthLoginFulfilled
  | AuthLoginRejected
  | AuthLogout
  | TweetsCreated
  | TweetsLoaded
  | UiResetError;
