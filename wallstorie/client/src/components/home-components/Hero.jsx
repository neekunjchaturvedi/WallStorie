import { ArrowRight, MoveUpRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const nav = useNavigate();
  return (
    <>
      <section class="relative bg-white py-12">
        <div class="max-w-6xl mx-auto justify-items-center ">
          <img
            src="/src/assets/wallpaperimages/group40.png"
            alt="union1"
            class="lg:h-[600px] lg:w-[900px]  bg-cover bg-center"
          />
        </div>

        <div class="absolute inset-0 flex items-center justify-center">
          <div class="bg-gray-70 backdrop-blur-md p-10 rounded-lg shadow-lg max-w-lg text-center ">
            <h1 class="text-4xl font-extrabold text-white mb-4 opacity-100">
              LET YOUR WALLS TELL YOUR STORIES
            </h1>
            <p class="text-gray-700 mb-6">
              Bring your walls to life with designs that echo your personality
              and create spaces you'll love coming home to.
            </p>
            <a
              onClick={() => {
                nav("/wallpapers");
              }}
              class="inline-flex items-center px-6 py-3 text-white bg-green-700 hover:bg-green-800 rounded-lg cursor-pointer"
            >
              Find your style
              <MoveUpRight />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
