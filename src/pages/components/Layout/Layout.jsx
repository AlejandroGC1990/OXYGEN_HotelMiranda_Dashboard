import { Outlet, useNavigate } from "react-router-dom";
import LateralMenu from "../LateralMenu/LateralMenu";
import Nav from "../Nav/Nav";
import "./__layout.scss";
import { isAuthenticated } from "../../../utils/auth";
import { useEffect } from "react";

const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
      <div className="layout">
        <LateralMenu />
        <div className="layout__container">
          <Nav />
          <main className="layout__container__main">
            <Outlet />
          </main>
        </div>
      </div>
  );
};

export default Layout;
