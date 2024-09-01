import { Outlet } from "react-router-dom";
import LateralMenu from "../components/LateralMenu/LateralMenu";

const Layout = () => {
  return (
    <div className="layout">
      <LateralMenu />
      <div className="layout_container">
        {/* Nav se puede agregar aquí si es necesario */}
        <main className="layout__container__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;