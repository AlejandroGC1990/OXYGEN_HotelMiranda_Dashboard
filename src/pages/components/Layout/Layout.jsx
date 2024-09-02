import { Outlet, useNavigate } from "react-router-dom";
import LateralMenu from "../LateralMenu/LateralMenu";
import Nav from "../Nav/Nav";
import "./__layout.scss";
import { isAuthenticated } from "../../../utils/auth";
import { useEffect, useState } from "react";
import Login from "../Login/Login";
import styled from "styled-components";

const BlurBackground = styled.div`
filter: blur(5px);
`;

const Layout = () => {
  const [showModal, setShowModal] = useState(!isAuthenticated());
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, []);

  const handleLoginClose = () => {
    setShowModal(false);
    if (!isAuthenticated()) {
      navigate("/");
    }
  };

  return (
    <>
      {showModal && <Login onClose={handleLoginClose} />}
      <div className={showModal ? <BlurBackground/> : "layout"}>
        <LateralMenu />
        <div className="layout__container">
          <Nav />
          <main className="layout__container__main">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
