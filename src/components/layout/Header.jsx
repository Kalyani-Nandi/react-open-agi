import React from "react";

import RunIcon from "../icons/RunIcon";
import Logo from "../icons/Logo";
import { useFormContext } from "../../context/FormContext";
import { useAlert } from "../../context/AlertContext";
function Header() {
  const { handleNavButtonClick, response } = useFormContext();
  const { showAlert } = useAlert();
  const handleDeploy = () => {
    showAlert({
      alertType: "success",
      message: "Successfully deployed",
    });
  };
  return (
    <nav className="fixed top-0 left-0 w-full py-3 px-10 font-bold bg-white text-black flex justify-between items-center shadow-md z-20">
      <div className="flex gap-4 justify-center text-lg items-center ">
        <Logo />
        OpenAGI
      </div>
      <div className="gap-5 text-base flex">
        <button
          className="bg-gray-400 hover:bg-gray-500 text-white py-1 px-4 rounded-lg"
          onClick={handleDeploy}
          disabled={!response}
        >
          Deploy
        </button>
        <button
          className="bg-green-700 hover:bg-green-600 text-white py-1 px-4 flex gap-1 justify-center items-center rounded-lg"
          onClick={handleNavButtonClick}
          // disabled={response}
        >
          <RunIcon />
          Run
        </button>
      </div>
    </nav>
  );
}

export default Header;
