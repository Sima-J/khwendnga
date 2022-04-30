import React from 'react';
import girlStudent from '../../../assets/girlStudent.svg';
export default function login() {
  return (
    <div class="h-screen flex">
      <div class="flex md:w-1/2 sm:w-1/4 bg-heroLogin bg-tBlue bg-contain bg-no-repeat justify-around items-center">
        <div>
          <h1 class=" font-bold text-4xl text-white font-sans">khwendnga</h1>
          <p class="text-white mt-1">LEARNING HAS NEVER BEEN EASIER!</p>
        </div>
      </div>
      <div class="flex md:w-1/2 sm:w-1/4  justify-center items-center bg-white">
        <form class="bg-white w-3/4">
          <h1 class="text-gray-800 font-bold text-3xl mb-1">Hello Again!</h1>
          <p class="text-lg font-normal text-gray-600 mb-7">Welcome Back</p>
          <div class="flex items-center border-2 py-3 px-6 rounded-2xl mb-4">
            <img src={girlStudent} alt="user" class="w-8 h-8 " />
            <input
              class="pl-2 outline-none border-none"
              type="text"
              name="userName"
              id="userName"
              placeholder="Username"
            />
          </div>
          <div class="flex items-center border-2 py-3 px-6 rounded-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd"
              />
            </svg>
            <input
              class="pl-2 outline-none border-none"
              type="text"
              name=""
              id=""
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            class="block w-full bg-indigo-600 mt-4 py-3 rounded-2xl text-white font-semibold mb-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
