import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import DashboardContext from "../context/DashboardContext";
import OptionsContext from "../context/OptionsContext";

function NavItem() {
  let { logout } = useContext(AuthContext);
  let { handleNavSeen } = useContext(DashboardContext);
  let { options } = useContext(OptionsContext);

  const site = document.getElementById("siteWrapper");
  const bodyTag = document.getElementsByTagName("body")[0];
  return options.map((o) => {
    return (
      <li
        name={o?.title.toLowerCase()}
        className=" py-2 text-[1.5rem]"
        onClick={(e) => {
          if (o?.title.toLowerCase() === "logout") {
            return logout();
          }
          site.classList.remove("navbar-active-site-wrapper");
          site.classList.add("navbar-deactive-site-wrapper");
          bodyTag.classList.remove("active-navbar-body");
          handleNavSeen(e);
        }}
      >
        <div className="space-x-3 flex items-center ">
          <div className="h-[2rem] w-[2rem]">{o.image}</div>
          <h1>{o.title}</h1>
        </div>
      </li>
    );
  });
}

export default NavItem;
