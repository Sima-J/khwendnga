import React from 'react';

export default function register() {
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
        <h1 className="text-2xl font-bold text-center">
          Adding New User to Khwendnga <br />
          <span className="font-normal text-center my-2">
            Please fill in User information
          </span>
        </h1>
        <form className="mt-6">
          <div className="mb-4 	">
            <label class="block text-sm font-medium text-gray-700">Photo</label>
            <div class="mt-1 flex items-center">
              <span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                <svg
                  class="h-full w-full text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
              <button
                type="button"
                class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Change
              </button>
            </div>
          </div>
          <div className="flex justify-between gap-3">
            <span className="w-1/2">
              <label
                for="firstName"
                className="block text-xs font-semibold text-gray-600 uppercase"
              >
                Firstname
              </label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                placeholder="Sima"
                autocomplete="given-name"
                className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                required
              />
            </span>
            <span className="w-1/2">
              <label
                for="middleName"
                className="block text-xs font-semibold text-gray-600 uppercase"
              >
                Middle Name
              </label>
              <input
                id="middlename"
                type="text"
                name="middleName"
                placeholder="Jazaa"
                autocomplete="middle-name"
                className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                required
              />
            </span>
            <span className="w-1/2">
              <label
                for="lastName"
                className="block text-xs font-semibold text-gray-600 uppercase"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Mohammed"
                autocomplete="family-name"
                className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                required
              />
            </span>
          </div>
          <label
            for="userName"
            className="block text-xs mt-2 font-semibold text-gray-600 uppercase"
          >
            username
          </label>
          <input
            id="userName"
            type="text"
            name="userName"
            placeholder="sima"
            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
          />
          <div className="flex justify-between gap-3">
            <span className="w-1/2">
              <label
                for="firstName"
                className="block text-xs font-semibold text-gray-600 uppercase"
              >
                City
              </label>
              <input
                id="city"
                type="text"
                name="city"
                placeholder="Sima"
                autocomplete="given-name"
                className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                required
              />
            </span>
            <span className="w-1/2">
              <label
                for="street"
                className="block text-xs font-semibold text-gray-600 uppercase"
              >
                Street{' '}
              </label>
              <input
                id="street"
                type="text"
                name="street"
                placeholder="Jazaa"
                autocomplete="street"
                className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                required
              />
            </span>
          </div>
          <label
            for="accountType"
            className="block text-xs  font-semibold text-gray-600 uppercase"
          ></label>
          <select
            id="accountType"
            name="accountType"
            placeholder="sima"
            className="block w-full p-3 mt-4 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
          >
            <option>Choose an account type</option>
            <option>Teacher</option>
            <option>Student</option>
            <option>Admin</option>
          </select>
          <label
            for="email"
            className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >
            Grade
          </label>
          <input
            id="grade"
            type="number"
            name="grade"
            placeholder="5"
            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
          />

          <label
            for="email"
            className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >
            E-mail
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="name@email.com"
            autocomplete="email"
            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
          />
          <label
            for="userName"
            className="block text-xs mt-2 font-semibold text-gray-600 uppercase"
          >
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            placeholder="07501188256"
            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
          />
          <label
            for="password"
            className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="********"
            autocomplete="new-password"
            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
          />
          <label
            for="password-confirm"
            className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >
            Confirm password
          </label>
          <input
            id="password-confirm"
            type="password"
            name="password-confirm"
            placeholder="********"
            autocomplete="new-password"
            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
          />
          <button
            type="submit"
            className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
