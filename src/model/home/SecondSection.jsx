import React from 'react';
import { Link } from 'react-router-dom';

export default function SecondSection() {
  return (
    <div className="mt-2 mb-6">
      <div className="md:flex mt-8 md:-mx-4">
        <div className="w-full h-80 md:mx-4 rounded-md overflow-hidden bg-cover bg-chatBanner bg-center md:w-1/2">
          <div className="bg-gray-800 bg-opacity-40 flex items-center h-full">
            <div className="px-10 max-w-xl">
              <h2 className="text-2xl text-normalPurple font-semibold">CHAT</h2>
              <p className="mt-2 text-white">Talk with your teacher</p>
              <Link
                to="/chat"
                className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline hover:text-normalPurple focus:outline-none"
              >
                <span>Chat Now</span>
                <svg
                  className="h-5 w-5 mx-2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full h-90 mt-8 md:mx-4 rounded-md overflow-hidden bg-cover bg-gradeBanner bg-center md:mt-0 md:w-1/2">
          <div className="bg-gray-800 bg-opacity-40 flex items-center h-full">
            <div className="px-10 max-w-xl">
              <h2 className="text-2xl text-normalPurple font-semibold">
                Grades
              </h2>
              <p className="mt-2 text-white">Check your grades!</p>
              <Link
                to="/chat"
                className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline hover:text-normalPurple focus:outline-none"
              >
                <span>Grade Now</span>
                <svg
                  className="h-5 w-5 mx-2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>{' '}
    </div>
  );
}
