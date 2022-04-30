import React from 'react';
import movie from '../../../assets/movie.mp4';
import bannerHome from '../../../assets/bannerHome.png';
export default function mainHero() {
  return (
    <section class="w-full h-screen bg-gradient-to-r from-blue-800 to-blue-400 flex flex-col-reverse md:flex-row justify-center items-center overflow-hidden">
      <div class="relative w-full md:w-1/2 mt-20 md:mt-0 flex justify-center items-center transform scale-75 md:scale-100">
        <div class="relative z-10 bg-gray-800 rounded-lg w-terminal custom-shadow">
          <div class="flex items-center">
            <div class="flex items-center space-x-2 p-3">
              <div class="bg-red-500 rounded-full w-3 h-3"></div>
              <div class="bg-yellow-500 rounded-full w-3 h-3"></div>
              <div class="bg-green-500 rounded-full w-3 h-3"></div>
            </div>
            <h1 class="text-blue-500">Khwendnga</h1>
          </div>
          <video autoPlay loop muted class="p-1.5  overflow-hidden rounded-lg">
            <source src={movie} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div class="w-full md:w-1/2 flex justify-center items-center transform scale-75 md:scale-125 translate-x-20 md:translate-x-40 translate-y-0 md:-translate-y-20">
        <img
          class="w-80 h-80 rounded-full border-4 border-white custom-shadow"
          src={bannerHome}
          alt=""
        />

        <div class="hw-inner flex justify-between items-center absolute border border-gray-800 rounded-full animate-spin-slow anim-8s">
          <div class="bg-white p-1 rounded-full custom-shadow h-10 w-10  transform -translate-x-5 ">
            <img
              class="h-9 w-9 object-center animate-rotate-img anim-8s"
              src="./assets/alpine.png"
              alt=""
            />
          </div>
          <div class="bg-white overflow-hidden rounded-full custom-shadow h-10 w-10 transform translate-x-5 ">
            <img
              class="h-10 w-10 object-center animate-rotate-img anim-8s"
              src="./assets/javascript.png"
              alt=""
            />
          </div>
        </div>

        <div class="hw-outer flex justify-between items-center absolute border border-gray-800 rounded-full animate-spin-slow ">
          <div class="flex justify-between items-center h-full w-full">
            <div class="bg-white p-1 rounded-full custom-shadow h-10 w-10  transform translate-x-8 translate-y-40 ">
              <img
                class="h-full w-full object-center animate-rotate-img "
                src="./assets/flutter.png"
                alt=""
              />
            </div>
            <div class="bg-white overflow-hidden p-1 rounded-full custom-shadow h-10 w-10 transform -translate-x-8 -translate-y-40 ">
              <img
                class="h-full w-full object-center animate-rotate-img"
                src="./assets/svelte.png"
                alt=""
              />
            </div>
          </div>

          <div class="absolute flex justify-between items-center h-full w-full">
            <div class="bg-white p-1 rounded-full custom-shadow h-10 w-10  transform translate-x-8 -translate-y-40">
              <img
                class="h-full w-full object-center animate-rotate-img "
                src="./assets/tailwindcss.png"
                alt=""
              />
            </div>
            <div class="bg-white overflow-hidden p-1 rounded-full custom-shadow h-10 w-10 transform -translate-x-8 translate-y-40 ">
              <img
                class="h-full w-full object-center animate-rotate-img "
                src="./assets/vuejs.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
