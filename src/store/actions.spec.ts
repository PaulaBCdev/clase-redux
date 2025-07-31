import { authLoginPending, tweetsLoadedFulfilled } from "./actions";

describe("authLoginPending", () => {
  test("should return an 'auth/login/pending' action", () => {
    const expected = { type: "auth/login/pending" };
    const result = authLoginPending();
    expect(result).toEqual(expected);
  });
});

describe("tweetsLoadedFulfilled", () => {
  test("should return an 'tweets/loaded/fulfilled' action with empty tweets", () => {
    const expected = { type: "tweets/loaded/fulfilled", payload: [] };
    const result = tweetsLoadedFulfilled([]);
    expect(result).toEqual(expected);
  });

  test("should return an 'tweets/loaded/fulfilled' action with 2 tweets", () => {
    const tweets = [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ];
    const expected = { type: "tweets/loaded/fulfilled", payload: tweets };
    // @ts-expect-error: just for testing, not valid tweets
    const result = tweetsLoadedFulfilled(tweets);
    expect(result).toEqual(expected);
    expect(result.payload).toHaveLength(2);
  });
});
