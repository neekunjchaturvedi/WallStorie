import React from "react";

export const Hero = () => {
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
            <h1 class="text-4xl font-bold text-gray-800 mb-4 opacity-100">
              LET YOUR WALLS TELL YOUR STORIES
            </h1>
            <p class="text-gray-600 mb-6">
              Bring your walls to life with designs that echo your personality
              and create spaces you'll love coming home to.
            </p>
            <a
              href="#"
              class="inline-flex items-center px-6 py-3 text-white bg-green-700 hover:bg-green-800 rounded-lg"
            >
              Find your style
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 12h14m-7-7l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
