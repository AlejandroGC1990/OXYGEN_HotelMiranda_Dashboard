import { Outlet, useNavigate } from "react-router-dom";
import LateralMenu from "../LateralMenu/LateralMenu";
import Nav from "../Nav/Nav";
import "./__layout.scss";
import { isAuthenticated } from "../../../utils/auth";
import { useEffect, useState } from "react";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  const toggleMenu = (isOpen) => {
    setIsMenuOpen(isOpen);
  };

  return (
    <div className="layout">
      <LateralMenu isOpen={isMenuOpen}/>
      <div className={`layout__container ${isMenuOpen ? 'menu-open' : ''}`}>
        <Nav toggleMenu={toggleMenu} />
        <main className="layout__container__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
