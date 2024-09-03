import { Outlet, useNavigate } from "react-router-dom";
import LateralMenu from "../LateralMenu/LateralMenu";
import Nav from "../Nav/Nav";
import "./__layout.scss";
import { isAuthenticated } from "../../../utils/auth";
import { useEffect, useState } from "react";
import Login from "../Login/Login";
import styled from "styled-components";

const BlurBackground = styled.div`
  filter: blur(500px);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 1);
  z-index: 0;
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
      <div className="layout">
        {showModal && <BlurBackground />}
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
