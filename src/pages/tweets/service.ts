import { client } from "../../api/client";
import type { Tweet } from "./types";

const TWEETS_URL = "/api/tweets";

export const getLatestTweets = async () => {
  const url = `${TWEETS_URL}?_expand=user&_embed=likes&_sort=updatedAt&_order=desc`;
  const response = await client.get<Tweet[]>(url);
  return response.data;
};

export const getTweet = async (tweetId: string) => {
  const url = `${TWEETS_URL}/${tweetId}`;
  const response = await client.get<Tweet>(url);
  return response.data;
};

export const createTweet = async (content: string) => {
  const response = await client.post<Tweet>(TWEETS_URL, { content });
  return response.data;
};
