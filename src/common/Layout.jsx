import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {

  return (
    <>
      <NavBar />
      {/* {children} */}
      <Outlet />
    </>

  );
};

export default Layout;
