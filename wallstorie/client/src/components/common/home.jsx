import React from "react";
import { useNavigate } from "react-router-dom";

function Homebutton() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/storie/home");
  };
  return (
    <button
      className="bg-green-50 px-3 py-2 rounded-lg"
      onClick={handleRedirect}
    >
      Home
    </button>
  );
}

export default Homebutton;
