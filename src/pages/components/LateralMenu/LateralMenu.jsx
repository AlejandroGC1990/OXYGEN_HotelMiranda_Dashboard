import { Link } from "react-router-dom";
import "./__lateralMenu.scss";
import PropTypes from "prop-types";

const LateralMenu = ({ isOpen }) => {
  return (
    <div className={`lateralMenu ${isOpen ? 'open' : 'closed'}`}>
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
        <Link to="/contact" className="lateralMenu__sections__pack">
          <p>Contact</p>
        </Link>
        <Link to="/users" className="lateralMenu__sections__pack">
          <p>Users</p>
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

LateralMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default LateralMenu;
