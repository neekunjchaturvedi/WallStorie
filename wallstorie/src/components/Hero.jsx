import React from "react";

export const Hero = () => {
  return (
    <>
      <section class="relative bg-green-100 py-12">
        <div class="grid grid-cols-3 gap-4 max-w-6xl mx-auto">
          <div class="bg-[url('/path/to/image1.jpg')] bg-cover bg-center h-[500px] rounded-tl-[50px] rounded-bl-[50px] border-4 border-yellow-400"></div>
          <div class="bg-[url('/path/to/image2.jpg')] bg-cover bg-center h-[500px] border-4 border-yellow-400"></div>
          <div class="bg-[url('/path/to/image3.jpg')] bg-cover bg-center h-[500px] rounded-tr-[50px] rounded-br-[50px] border-4 border-yellow-400"></div>
        </div>

        <div class="absolute inset-0 flex items-center justify-center">
          <div class="bg-white/70 backdrop-blur-md p-10 rounded-lg shadow-lg max-w-lg text-center opacity">
            <h1 class="text-4xl font-bold text-gray-800 mb-4 opacity-100">
              LET YOUR WALLS TELL YOUR STORIES
            </h1>
            <p class="text-gray-600 mb-6">
              Bring your walls to life with designs that echo your personality
              and create spaces you'll love coming home to.
            </p>
            <a
              href="#"
              class="inline-flex items-center px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg"
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
