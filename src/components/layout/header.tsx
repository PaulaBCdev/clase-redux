import "./header.css";
// import logo from "../../assets/twitter.svg";
import TwitterIcon from "../icons/twitter-icon.tsx";
import AuthButton from "../../pages/auth/auth-button.tsx";
import { Link, NavLink } from "react-router";

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <div className="header-logo">
          {/* <img src={logo} width={32} /> */}
          <TwitterIcon width={32} height={32} />
        </div>
      </Link>
      <nav className="header-nav">
        <NavLink to="/tweets/new">New Tweet</NavLink>
        <NavLink to="/tweets" end>
          Latest Tweets
        </NavLink>
        <AuthButton />
      </nav>
    </header>
  );
}

export default Header;
