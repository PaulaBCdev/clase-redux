import "./login-page.css";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import Button from "../../components/ui/button";
import FormField from "../../components/ui/form-field";
import { AxiosError } from "axios";
import { useLoginAction, useUiResetError } from "../../store/hooks";
import { useAppSelector } from "../../store";
import { getUi } from "../../store/selectors";

function LoginPage() {
  const loginAction = useLoginAction();
  const uiResetErrorAction = useUiResetError(); //cuando clicamos sobre el error (el onClick() esta abajo en el return) el campo error de ui cambia a null, por lo que el mensaje de error desaparece
  const { pending: isFetching, error } = useAppSelector(getUi); //esta variable es la que permite la "subscripcion" a todo lo relacionado con la ui (errores y el pending) para que la interfaz pueda reaccionar cada vez que algo de ui cambie
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  // const firstTime = useRef(true);
  //const timeoutRef = useRef<number | null>(null);

  /* useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      console.log("Timeout", timeoutRef.current);
    }, 20000);
    console.log("creating timeout", timeoutRef.current);

    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
    };
    // console.log("Effect");
    // if (firstTime.current) {
    //   console.log("First time");
    //   firstTime.current = false;
    // }
  }, []); */

  const { username, password } = credentials;
  const isDisabled = !username || !password || isFetching;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await loginAction(credentials);
    // Este await antes estaba metido dentro de un try-catch (el que tenemos justo abajo), pero en esta ocasion, como ejemplo de clase, el profesor ha hecho un middleware que se encarga de manejar los errores, por lo que en este punto del codigo solo necesitamos llamar a loginAction y ya el middleware se encarga de captar el error y enseñarlo en caso de que se dé
    //try {
    /* loginActionPending();
      await login(credentials);
      loginActionFulfilled(); */
    //await loginAction(credentials); // esta sola linea hace todo lo que hay en las tres lineas superiores + loginActionRejected
    //} catch (error) {
    //if (error instanceof AxiosError) {
    //console.log(error);
    //}
    //}
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
            uiResetErrorAction();
          }}
        >
          {error.message}
        </div>
      )}
    </div>
  );
}

export default LoginPage;
