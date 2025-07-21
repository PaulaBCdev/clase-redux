import type { AppThunk } from ".";
import { login } from "../pages/auth/service";
import type { Credentials } from "../pages/auth/types";
import {
  createTweet,
  getLatestTweets,
  getTweet,
} from "../pages/tweets/service";
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

type TweetsLoadedFulfilled = {
  type: "tweets/loaded/fulfilled";
  payload: Tweet[];
};

type TweetsCreatedFulfilled = {
  type: "tweets/created/fulfilled";
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

export const tweetsLoadedFulfilled = (
  tweets: Tweet[],
): TweetsLoadedFulfilled => ({
  type: "tweets/loaded/fulfilled",
  payload: tweets,
});

export const tweetsCreatedFulfilled = (
  tweet: Tweet,
): TweetsCreatedFulfilled => ({
  type: "tweets/created/fulfilled",
  payload: tweet,
});

export function tweetsLoaded(): AppThunk<Promise<void>> {
  return async function (dispatch, getState) {
    const state = getState();
    if (state.tweets) {
      return;
    }
    // El crear una variable state que es el estado actual que hay guardado en Redux sirve para que, en el caso de que ya haya un array (es decir, ya se ha llamado a la api y se han obtenido los tweets) no se vuelva a realizar otra llamada a la api

    try {
      // Igual que hicimos con la funcion authLogin(), aqui podemos tratar un tweetsLoadedPending (los tweets estan cargando)...
      const tweets = await getLatestTweets();
      dispatch(tweetsLoadedFulfilled(tweets)); //Aqui cogemos los tweets que se han cargado de la API y se los mandamos al estado global para que Redux los guarde
    } catch (error) {
      // ... y aqui un tweetsLoadedRejected (error al cargar os tweets)
      console.log(error);
    }
  };
}

export function tweetsCreate(tweetContent: string): AppThunk<Promise<Tweet>> {
  return async function (dispatch) {
    try {
      // Aqui se trataria el tweetsCreatedPending
      // Aqui se trata el tweetsCreatedFulfilled
      const createdTweet = await createTweet(tweetContent);
      const tweet = await getTweet(createdTweet.id.toString()); // createdTweet no contiene toda la informacion que pide sparrest, por lo que daria un error. Creamos una variable tweet que ya si contiene toda la informacion de tweet que necesita sparrest. ATENCION: este paso no es necesario en la practica, nos vale solo con el createdTweet
      dispatch(tweetsCreatedFulfilled(tweet));
      return tweet;
    } catch (error) {
      // Aqui se trataria el tweetsCreatedRejected
      console.log(error);
      throw error;
    }
  };
}

export const uiResetError = (): UiResetError => ({
  type: "ui/reset-error",
});

export type Actions =
  | AuthLoginPending
  | AuthLoginFulfilled
  | AuthLoginRejected
  | AuthLogout
  | TweetsCreatedFulfilled
  | TweetsLoadedFulfilled
  | UiResetError;
