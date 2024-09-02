import { useNavigate } from "react-router-dom";
import { logout } from "../../../utils/auth";
import "./__nav.scss";

const Nav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="nav">
      <button>
        <img
          className="nav_iconCloseShow"
          src=""
          alt="Butoon show/close lateralMenu"
          // onClick={}
        />
      </button>

      <div className="nav__container">
        <button>
          <img
            className="nav__container__icon"
            src=""
            alt="Messages"
            // onClick={}
          />
        </button>
        <button>
          <img
            className="nav__container__icon"
            src=""
            alt="Alerts"
            // onClick={}
          />
        </button>

        <button>
          <img
            className="nav__container__icon"
            src=""
            alt="Logout"
            onClick={handleLogout}
          />
        </button>
      </div>
    </div>
  );
};

export default Nav;
