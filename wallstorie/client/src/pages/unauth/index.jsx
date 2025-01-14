import Homebutton from "@/components/common/home";
import React from "react";

function Unauth() {
  return (
    <div>
      <h1 className="text-4xl p-3">No access Unauthourized page</h1>
      <p className="p-3">return back to home</p>
      <Homebutton />
    </div>
  );
}

export default Unauth;
