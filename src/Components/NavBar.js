import React from "react";
import { GlobalContext } from "./Context/GlobalContextProvider";
import { ShoppingCart } from "@styled-icons/zondicons/ShoppingCart";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const { globalState, globalDispatch } = React.useContext(GlobalContext);

  return (
    <div className="h-[75px] bg-black flex items-center">
      <div
        className="h-[50px] w-[50px] cursor-pointer ml-2"
        onClick={() => navigate(`/`)}
      >
        <img src="/logo192.png" />
      </div>
      <div
        className="text-center navbar-components ml-auto pr-6  cursor-pointer"
        onClick={() => navigate(`/cart`)}
      >
        <div className={"text-white"}>{globalState.cartCount}</div>
        <ShoppingCart className="-mt-5" size="17" color={"#ff7449"} />
      </div>
    </div>
  );
}

export default NavBar;
