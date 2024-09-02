import { Outlet } from "react-router-dom";
import LateralMenu from "../LateralMenu/LateralMenu";
import Nav from "../Nav/Nav";
import "./__layout.scss";


const Layout = () => {
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