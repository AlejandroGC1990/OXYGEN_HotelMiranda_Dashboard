import "./_nav.scss";

const Nav = () => {

  return (
    <div className="nav">
      <button>
        <img className="nav_iconCloseShow" 
        src=""  
        alt="Butoon show/close lateralMenu" 
        // onClick={}
        />
      </button>
      <div className="nav__container">
      <img
        className="nav__container__icon"
        src="" 
        alt="Messages"
        // onClick={}
      />
      <img
        className="nav__container__icon"
        src="" 
        alt="Alerts"
        // onClick={}
      />
      <img
        className="nav__container__icon"
        src="" 
        alt="Logout"
        // onClick={}
      />
      </div>
    </div>
  );
};

export default Nav;