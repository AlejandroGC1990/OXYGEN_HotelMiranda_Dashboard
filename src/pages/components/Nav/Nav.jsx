import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { logout } from "../../../utils/auth";
import "./__nav.scss";
import { useState } from "react";

const Nav = ({ toggleMenu }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    toggleMenu(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="nav">
      <button onClick={handleToggleMenu}>
        <img
          className="nav_iconCloseShow"
          src=""
          alt="Butoon show/close lateralMenu"
        />
      </button>

      <div className="nav__container">
        <button>
          <img className="nav__container__icon" src="" alt="Messages" />
        </button>
        <button>
          <img className="nav__container__icon" src="" alt="Alerts" />
        </button>

        <button onClick={handleLogout}>
          <img className="nav__container__icon" src="" alt="Logout" />
        </button>
      </div>
    </div>
  );
};

Nav.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
};

export default Nav;
