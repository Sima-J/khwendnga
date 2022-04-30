import React from 'react';

export default function courseHero() {
  return (
    <div class="pt-24 ">
      <div class="container px-4 py-8 mx-auto flex flex-wrap flex-col md:flex-row items-center bg-heroCourse bg-cover">
        <div class="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left ">
          <h1 class="my-4 text-5xl font-bold leading-tight text-white">
            Name Course
          </h1>
          <h2 class="my-4 mb-8 text-5xl font-bold leading-tight text-white">
            Teacher Name
          </h2>

          <p class="leading-normal text-2xl mb-8 text-white">
            Sub-hero message, not too long and not too short. Make it just
            right!
          </p>
          <br />
        </div>
      </div>
    </div>
  );
}
