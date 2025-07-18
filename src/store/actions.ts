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

export const AuthLoginPending = (): AuthLoginPending => ({
  type: "auth/login/pending",
});

export const AuthLoginFulfilled = (): AuthLoginFulfilled => ({
  type: "auth/login/fulfilled",
});

export const AuthLoginRejected = (error: Error): AuthLoginRejected => ({
  type: "auth/login/rejected",
  payload: error,
});

export const authLogout = (): AuthLogout => ({
  type: "auth/logout",
});

export const tweetsLoades = (tweets: Tweet[]): TweetsLoaded => ({
  type: "tweets/loaded",
  payload: tweets,
});

export const tweetsCreated = (tweet: Tweet): TweetsCreated => ({
  type: "tweets/created",
  payload: tweet,
});

export type Actions =
  | AuthLoginPending
  | AuthLoginFulfilled
  | AuthLoginRejected
  | AuthLogout
  | TweetsCreated
  | TweetsLoaded;
