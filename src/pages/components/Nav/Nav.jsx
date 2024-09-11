import PropTypes from "prop-types";
import "./__nav.scss";
import { useState } from "react";
import LogoutButton from "../../components/LogoutButton";

const Nav = ({ toggleMenu }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    toggleMenu(!isMenuOpen);
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

        <LogoutButton />
      </div>
    </div>
  );
};

Nav.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
};

export default Nav;
