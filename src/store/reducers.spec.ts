import type { Tweet } from "../pages/tweets/types";
import { auth, tweets } from "./reducer";

describe("auth reducer", () => {
  test("should manage 'auth/login/fulfilled' action", () => {
    const result = auth(false, { type: "auth/login/fulfilled" });
    expect(result).toBe(true);
  });

  test("ahould manage 'auth/logout' action", () => {
    const result = auth(true, { type: "auth/logout" });
    expect(result).toBe(false);
  });

  test("should manage any other action", () => {
    const result = auth(true, { type: "ui/reset-error" });
    expect(result).toBe(true);
  });
});

describe("tweets reducer", () => {
  const tweet: Tweet = {
    id: 1,
    content: "Content",
    updatedAt: "",
    userId: 1,
    user: { name: "name", username: "username" },
    likes: [],
  };
  // En este test simulamos que no teniamos ningun tweety y hemos creado el primero (el de arriba)
  test("should manage 'tweets/created/fulfilled' action", () => {
    const result = tweets(
      { data: [], loaded: false },
      { type: "tweets/created/fulfilled", payload: tweet },
    );
    expect(result.data).toHaveLength(1); //comprueba que la longitud de data sea 1 porque solo contiene "el tweet que acabamos de crear"
    expect(result.data).toEqual([tweet]); //comprueba que la data sea un array con el tweet que acabamos de "crear"
    expect(result.loaded).toBe(false); //comprueba que, al haber "creado" el primer tweet, no hemos cargado la lista de tweets (porque no habia antes del que hemos creado)
  });
});
