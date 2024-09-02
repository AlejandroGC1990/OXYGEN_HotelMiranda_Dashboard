import { Link } from "react-router-dom";
import "./__lateralMenu.scss";

const LateralMenu = () => {
  return (
    <div className="lateralMenu">
      <div className="lateralMenu__sections">
        <Link to="/" className="lateralMenu__sections__pack">
          <p>Dashboard</p>
        </Link>
        <Link to="/rooms" className="lateralMenu__sections__pack">
          <p>Rooms</p>
        </Link>
        <Link to="/bookings" className="lateralMenu__sections__pack">
          <p>Bookings</p>
        </Link>
        <Link to="/guest" className="lateralMenu__sections__pack">
          <p>Guest</p>
        </Link>
        <Link to="/concierge" className="lateralMenu__sections__pack">
          <p>Concierge</p>
        </Link>
      </div>
      <div className="lateralMenu__containerUser">
        <img src="" />
        <p>Name</p>
        <p>Email</p>
        <button>Edit</button>
      </div>
      <div className="lateralMenu__footerLateralMenu">
        <p>Travl Hotel Admin Dashboard</p>
        <p>@2020 All Right Reserved</p>
      </div>
    </div>
  );
};

export default LateralMenu;
