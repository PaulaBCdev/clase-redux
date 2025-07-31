import type { Tweet } from "../pages/tweets/types";
import type { Actions, ActionsRejected } from "./actions";

export type State = {
  auth: boolean;
  tweets: {
    loaded: boolean;
    data: Tweet[];
  };
  ui: {
    pending: boolean;
    error: Error | null;
  };
};

const defaultState: State = {
  auth: false,
  tweets: {
    loaded: false,
    data: [],
  },
  ui: {
    pending: false,
    error: null,
  },
};

/* export function reducer(state = defaultState, action: Actions): State {
  switch (action.type) {
    case "auth/login":
      return { ...state, auth: true };
    case "auth/logout":
      return { ...state, auth: false };
    case "tweets/created":
      return { ...state, tweets: [...state.tweets, action.payload] };
    case "tweets/loaded":
      return { ...state, tweets: action.payload };
    default:
      return state;
  }
} */

export function auth(
  state = defaultState.auth,
  action: Actions,
): State["auth"] {
  switch (action.type) {
    case "auth/login/fulfilled":
      return true;
    case "auth/logout":
      return false;
    default:
      return state;
  }
}

export function tweets(
  state = defaultState.tweets,
  action: Actions,
): State["tweets"] {
  switch (action.type) {
    case "tweets/loaded/fulfilled":
      return { loaded: true, data: action.payload };
    case "tweets/detail/fulfilled":
      return { loaded: false, data: [action.payload] };
    case "tweets/created/fulfilled":
      return { ...state, data: [action.payload, ...(state.data ?? [])] };
    // (state ?? []) quiere decir que si llegados a este punto state es null, me carga un array vacio
    default:
      return state;
  }
}

function isRejected(action: Actions): action is ActionsRejected {
  return action.type.endsWith("/rejected");
}

export function ui(state = defaultState.ui, action: Actions): State["ui"] {
  if (action.type === "auth/login/pending") {
    return { pending: true, error: null };
  }

  if (action.type === "auth/login/fulfilled") {
    return { pending: false, error: null };
  }

  if (isRejected(action)) {
    return { pending: false, error: action.payload };
  }

  if (action.type === "ui/reset-error") {
    return { ...state, error: null };
  }

  return state;
}

/* export function reducer(state = defaultState, action: Actions): State {
  return {
    auth: auth(state.auth, action),
    tweets: tweets(state.tweets, action),
  };
} */

/* ESTO MEJOR SE HACE EN EL INDEX.TS
export const reducer = combineReducers({
  auth, // igual que auth: auth (en auth me ejecutas la funcion auth)
  tweets, // igual que tweets: tweets (en tweets me ejecutas la funcion tweets)
});
A combineReducers se le pasa un objeto con la misma estructura que la indicada en el tipo, en este caso, State
 */
