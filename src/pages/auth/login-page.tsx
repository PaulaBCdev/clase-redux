import "./login-page.css";
import { useState, type ChangeEvent, type FormEvent } from "react";
import Button from "../../components/ui/button";
import { login } from "./service";
import FormField from "../../components/ui/form-field";
import { useLocation, useNavigate } from "react-router";
import { AxiosError } from "axios";
import { useLoginAction } from "../../store/hooks";
import { useAppSelector } from "../../store";
import { getUi } from "../../store/selectors";

function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const loginAction = useLoginAction();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const { pending: isFetching } = useAppSelector(getUi);

  const { username, password } = credentials;
  const isDisabled = !username || !password;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await login(credentials);
      loginAction();

      // Navigate to the page in state.from
      const to = location.state?.from ?? "/";
      navigate(to, { replace: true });
    } catch (error) {
      if (error instanceof AxiosError) {
        setError({
          message: error.response?.data?.message ?? error.message ?? "",
        });
      }
    }
  }

  return (
    <div className="login-page">
      <h1 className="login-page-title">Log in to Twitter</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="username"
          label="phone, email or username"
          value={username}
          onChange={handleChange}
        />
        <FormField
          type="password"
          name="password"
          label="password"
          value={password}
          onChange={handleChange}
        />
        <Button
          type="submit"
          $variant="primary"
          disabled={isDisabled}
          className="login-form-submit"
        >
          Log in
        </Button>
      </form>

      {/* Control de errores */}
      {error && (
        <div
          className="login-page-error"
          role="alert"
          onClick={() => {
            setError(null);
          }}
        >
          {error.message}
        </div>
      )}
    </div>
  );
}

export default LoginPage;
