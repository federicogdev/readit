import React, { ReactNode } from "react";
import Navbar from "../Navbar";

type LayoutProps = {
  children: ReactNode | any;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};
export default Layout;
