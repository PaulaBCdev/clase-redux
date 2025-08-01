import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "./login-page";
import { Provider } from "react-redux";
import type { RootState } from "../../store";
import { authLogin, uiResetError } from "../../store/actions";

//MOCKEAR UN MODULO
vi.mock("../../store/actions");
// asi podemos testear si se llama al modulo sin tener que hacer la llamada de verdad

describe("LoginPage", () => {
  const state: RootState = {
    auth: false,
    tweets: { data: [], loaded: false },
    ui: {
      pending: false,
      error: null,
    },
  };
  const renderComponent = (error?: Error) => {
    if (error) {
      state.ui.error = error;
    }

    return render(
      <Provider
        store={{
          getState: () => state,
          // @ts-expect-error: subscribe
          subscribe: () => {},
          // @ts-expect-error: dispatch
          dispatch: () => {},
        }}
      >
        <LoginPage />
      </Provider>,
    );
  };

  test("should render", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test("should dispatch login action", async () => {
    renderComponent();

    const usernameInput = screen.getByLabelText(/username/);
    const passwordInput = screen.getByLabelText(/password/);

    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("Log in");
    expect(button).toBeDisabled();

    /* fireEvent.change(usernameInput, { target: { value: "paula" } });
    fireEvent.change(passwordInput, { target: { value: "1234" } }); */
    await userEvent.type(usernameInput, "paula");
    await userEvent.type(passwordInput, "1234");

    expect(button).toBeEnabled();

    /* fireEvent.click(button); */
    await userEvent.click(button);

    expect(authLogin).toHaveBeenCalledWith({
      username: "paula",
      password: "1234",
    });
  });

  test("should render error", async () => {
    const error = new Error("Wrong username/password");
    const { container } = renderComponent(error);

    expect(container).toMatchSnapshot();

    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent(error.message);

    await userEvent.click(alert);
    expect(uiResetError).toHaveBeenCalled();
  });
});
