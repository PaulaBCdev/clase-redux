// Aqui van todas las funciones que voy a necesitar para sacar la informacion que necesite de Redux

import type { RootState } from ".";

export const getIsLogged = (state: RootState) => state.auth;

export const getTweets = (state: RootState) => state.tweets.data;

/* export const getTweetDetail = (state: RootState, tweetId?: string) =>
  state.tweets.find((tweet) => tweet.id === Number(tweetId)); */
export function getTweetDetail(tweetId?: string) {
  //A partir de aqui seria el selector real, la linea de antes crea una funcion que llama al selector
  return function (state: RootState) {
    return state.tweets.data.find((tweet) => tweet.id === Number(tweetId));
  };
}

export const getUi = (state: RootState) => state.ui;
