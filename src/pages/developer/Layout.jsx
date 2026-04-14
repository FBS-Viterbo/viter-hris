import React from "react";
import Header from "../../partials/Header";
import { navList } from "./nav-function";
import Navigation from "../../partials/Navigation";

const Layout = ({ children, menu = "", submenu = "" }) => {
  return (
    <>
      {/* HEADER */}
      <Header />

      {/* NAVIGATION */}
      <Navigation menu={menu} submenu={submenu} navigationList={navList} />

      {/* BODY */}
      <div className="wrapper">{children}</div>

      {/* FOOTER */}
    </>
  );
};

export default Layout;
