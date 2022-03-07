import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function NavItem({ options, setSeen }) {
  let { setIsLogged } = useContext(AuthContext);
  const history = useNavigate();
  function logout() {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    setIsLogged(false);
    history("/login");
  }
  function handleSeen(e) {
    setSeen(e.target.innerText.toLowerCase());
  }
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
          handleSeen(e);
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
