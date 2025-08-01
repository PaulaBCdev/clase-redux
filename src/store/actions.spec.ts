import type { Credentials } from "../pages/auth/types";
import { authLogin, authLoginPending, tweetsLoadedFulfilled } from "./actions";

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

describe("authLogin", () => {
  afterEach(() => {
    dispatch.mockClear();
    router.navigate.mockClear();
  }); // hay que indicar que cada vez que se llame al mock del dispatch y al del navigate, una vez se termine el test que los llama que se limpie, porque, sino, los tests que sigan van a dar error porque se ha llamado a dispatch y navigate mas veces de las que esperan

  const credentials: Credentials = {
    username: "paula",
    password: "1234",
  };

  const thunk = authLogin(credentials); // esto es lo que vamos a usar para pasar o no los tests

  // FUNCIONES MOCK
  const dispatch = vi.fn();
  const api = {
    auth: {
      login: vi.fn(),
    },
  };
  const from = "/from";
  const router = {
    state: { location: { state: { from } } },
    navigate: vi.fn(),
  }; // Tanto en el caso de router como de api, para el caso de este test concreto creamos las variables de api y router con lo que necesitemos, es decir, no hace falta hacer una variable api con todo lo que deberia contener de verdad, nos basta que tenga solo lo que vamos a necesitar en nuestro test

  test("when login resolves", async () => {
    api.auth.login = vi.fn().mockResolvedValue(undefined); //simula que el metodo de login resuelve
    // @ts-expect-error: no need getState
    await thunk(dispatch, undefined, { api, router });

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: "auth/login/pending" });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: "auth/login/fulfilled",
    });

    expect(api.auth.login).toHaveBeenCalledWith(credentials);

    expect(router.navigate).toHaveBeenCalledWith(from, { replace: true });
  });

  test("when login rejects", async () => {
    const error = new Error("unauthorized");
    api.auth.login = vi.fn().mockRejectedValue(error); //simula que el metodo de login falla

    // await thunk(dispatch, undefined, { api, router });
    await expect(() =>
      // @ts-expect-error: no need getState
      thunk(dispatch, undefined, { api, router }),
    ).rejects.toThrowError(error);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: "auth/login/pending" });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: "auth/login/rejected",
      payload: error,
    });

    expect(router.navigate).not.toHaveBeenCalled();
  });
});
