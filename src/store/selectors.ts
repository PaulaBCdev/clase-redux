import type { RootState } from ".";

export const getIsLogged = (state: RootState) => state.auth;

export const getTweets = (state: RootState) => state.tweets;

/* export const getTweetDetail = (state: RootState, tweetId?: string) =>
  state.tweets.find((tweet) => tweet.id === Number(tweetId)); */
export function getTweetDetail(tweetId?: string) {
  return function (state: RootState) {
    return state.tweets.find((tweet) => tweet.id === Number(tweetId));
  };
}

export const getUi = (state: RootState) => state.ui;
