import React from "react";

function Info() {
  return (
    <>
      <div className="mt-20 mb-12">
        <h2 className="text-3xl font-bold text-green-700 mb-3 ">
          Sell Your Art with Wallstorie
        </h2>
        <p className="text-gray-700 mt-2 font-lato mb-3">
          Be a Part of the WallStorie Artist Family!
        </p>
      </div>

      <div className="flex flex-col justify-center items-center">
        <p className="text-gray-700 mt-2 font-lato mb-3">
          <span className="text-6xl flex justify-start items-start text-green-600 playfair">“</span>
          Are you an artist looking to bring your creative vision to life in a
          new way?
        </p>
        <h4 className="text-lg text-green-700 mb-3 max-w-xl font-lato">
          WallStorie is inviting talented artists to collaborate with us and
          transform their stunning artwork into unique, high-quality wallpapers!
          Not only will your art be showcased to a wide audience, but you'll
          also earn a fair share of every sale.
        </h4>
      </div>
    </>
  );
}

export default Info;
