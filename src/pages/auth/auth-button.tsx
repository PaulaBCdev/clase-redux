import { Link } from "react-router";
import Button from "../../components/ui/button";
import { logout } from "../../pages/auth/service";
import { useAuth, useLogout } from "../../store/hooks.ts";

export default function AuthButton() {
  const isLogged = useAuth();
  const logoutAction = useLogout();

  const handleLogoutClick = async () => {
    await logout();
    logoutAction();
  };

  return isLogged ? (
    <Button onClick={handleLogoutClick} $variant="secondary">
      Logout
    </Button>
  ) : (
    <Button $variant="primary" as={Link} to="/login">
      Login
    </Button>
  );
}
