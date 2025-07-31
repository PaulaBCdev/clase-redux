import { Link } from "react-router";
import Button from "../../components/ui/button";
import { useAuth, useLogoutAction } from "../../store/hooks.ts";

export default function AuthButton() {
  const isLogged = useAuth();
  const logoutAction = useLogoutAction();

  return isLogged ? (
    <Button onClick={logoutAction} $variant="secondary">
      Logout
    </Button>
  ) : (
    <Button $variant="primary" as={Link} to="/login">
      Login
    </Button>
  );
}
