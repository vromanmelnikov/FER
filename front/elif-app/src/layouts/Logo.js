import { ReactComponent as LogoDark } from "../assets/images/logos/xtremelogo.svg";
import { Link } from "react-router-dom";
import logo from "../assets/images/logos/logo.jpg"

const Logo = () => {
  return (
    <div className="logo">
      <img src={logo} />
    </div>
  );
};

export default Logo;
