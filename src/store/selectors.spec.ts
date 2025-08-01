import type { RootState } from ".";
import type { Tweet } from "../pages/tweets/types";
import { getTweetDetail } from "./selectors";

describe("getTweet", () => {
  const tweet: Tweet = {
    id: 1,
    content: "Content",
    updatedAt: "",
    userId: 1,
    user: { name: "name", username: "username" },
    likes: [],
  };
  const state: RootState = {
    tweets: {
      data: [tweet],
      loaded: true,
    },
    auth: false,
    ui: {
      pending: false,
      error: null,
    },
  };

  test("should return a tweet with id 1", () => {
    const result = getTweetDetail("1")(state);
    expect(result).toBe(tweet);
  });

  test("should return undefined", () => {
    const result = getTweetDetail("2")(state);
    expect(result).toBeUndefined();
  });
});
