import React, { useEffect } from 'react';
import movie from '../../assets/movie.mp4';
import bannerHome from '../../assets/bannerHome.png';
import book from '../../assets/book.png';
import course from '../../assets/course.svg';
import calculator from '../../assets/calculator.png';
import chair from '../../assets/chair.png';
import laptop from '../../assets/laptop.png';
import stationary from '../../assets/stationary.png';
import Swal from 'sweetalert2';

export default function HomeBanner() {
  useEffect(() => {
    const interval = setInterval(() => {
      Swal.fire({
        title: 'Rest and Drink Some Water',
        width: 700,
        padding: '6em',
        color: '#8946A6',
        background: '#fff url("http://tny.im/sup")',
        backdrop: `
          rgba(0,0,123,0.4)
          url("http://tny.im/suo")
          left top
          no-repeat
        `,
      });
    }, 200000);

    return () => clearInterval(interval);
  }, []);
  return (
    <section className="w-full h-screen bg-gradient-to-r from-lightPurple to-blue flex flex-col-reverse md:flex-row justify-center items-center overflow-hidden">
      <div className="relative w-full md:w-1/2 mt-20 md:mt-0 flex justify-center items-center transform scale-75 md:scale-100">
        <div className="relative z-10 bg-gray-800 rounded-lg w-terminal custom-shadow">
          <div className="flex items-center">
            <div className="flex items-center space-x-2 p-3">
              <div className="bg-red-500 rounded-full w-3 h-3"></div>
              <div className="bg-yellow-500 rounded-full w-3 h-3"></div>
              <div className="bg-green-500 rounded-full w-3 h-3"></div>
            </div>
            <h1 className="text-blue-500">Khwendnga</h1>
          </div>
          <video
            autoPlay
            loop
            muted
            className="p-1.5  overflow-hidden rounded-lg"
          >
            <source src={movie} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex justify-center items-center transform scale-75 md:scale-125 translate-x-20 md:translate-x-10 translate-y-0 md:-translate-y-0">
        <img
          className="w-80 h-80 rounded-full border-4 border-white custom-shadow"
          src={bannerHome}
          alt="bannerHome"
        />

        <div className="hw-inner flex justify-between items-center absolute border border-gray-800 rounded-full animate-spin-slow anim-8s">
          <div className="bg-white p-1 rounded-full custom-shadow h-12 w-12  transform -translate-x-5 ">
            <img
              className="h-9 w-9 object-center animate-rotate-img anim-8s"
              src={book}
              alt="book"
            />
          </div>
          <div className="bg-white overflow-hidden rounded-full custom-shadow h-12 w-12 transform translate-x-5 ">
            <img
              className="h-10 w-10 object-center animate-rotate-img anim-8s"
              src={course}
              alt="course"
            />
          </div>
        </div>

        <div className="hw-outer flex justify-between items-center absolute border border-gray-800 rounded-full animate-spin-slow ">
          <div className="flex justify-between items-center h-full w-full">
            <div className="bg-white p-1 rounded-full custom-shadow h-12 w-12  transform translate-x-8 translate-y-40 ">
              <img
                className="h-full w-full object-center animate-rotate-img "
                src={laptop}
                alt="laptop"
              />
            </div>
            <div className="bg-white overflow-hidden p-1 rounded-full custom-shadow h-12 w-12 transform -translate-x-8 -translate-y-40 ">
              <img
                className="h-full w-full object-center animate-rotate-img"
                src={calculator}
                alt="calculator"
              />
            </div>
          </div>

          <div className="absolute flex justify-between items-center h-full w-full">
            <div className="bg-white p-1 rounded-full custom-shadow h-12 w-12  transform translate-x-8 -translate-y-40">
              <img
                className="h-full w-full object-center animate-rotate-img "
                src={chair}
                alt="chair"
              />
            </div>
            <div className="bg-white overflow-hidden p-1 rounded-full custom-shadow h-12 w-12 transform -translate-x-8 translate-y-40 ">
              <img
                className="h-full w-full object-center animate-rotate-img "
                src={stationary}
                alt="stationary"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
