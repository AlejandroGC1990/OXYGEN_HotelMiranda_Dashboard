import { Outlet, useNavigate } from "react-router-dom";
import LateralMenu from "../LateralMenu/LateralMenu";
import Nav from "../Nav/Nav";
import "./__layout.scss";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const {isLoggedIn} = useAuth(); //?Usar el estado del contexto
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

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
