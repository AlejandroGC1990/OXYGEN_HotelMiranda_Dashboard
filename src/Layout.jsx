
import { Outlet } from "react-router-dom";
import LateralMenu from "./pages/components/LateralMenu";

const Layout = () => {
  return (
    <div className="layout__content">
        <main className="layout__content__main">
          <LateralMenu />
          {/* <Nav /> */}
          <Outlet />
        </main>
      </div>
  );
}

export default Layout;
