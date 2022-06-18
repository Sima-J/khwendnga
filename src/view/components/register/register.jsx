import React, { useEffect, useState, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import {
  auth,
  registerWithEmailAndPassword,
  storage,
} from '../../../controller';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import swal from 'sweetalert';

export default function Register() {
  const [roleType, setRoleType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [street, setSteet] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(null);
  const [grade, setGrade] = useState('');
  const [gName, setGname] = useState('');
  const [gPhone, setGphone] = useState('');
  const [gEmail, setGemail] = useState('');

  // eslint-disable-next-line no-unused-vars
  const [progress, setProgress] = useState(0);
  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  const uploadFiles = (file) => {
    //
    if (!file) return;
    const sotrageRef = ref(storage, `users/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setImage(downloadURL);
        });
      }
    );
  };

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    registerWithEmailAndPassword(
      email,
      password,
      image,
      roleType,
      firstName,
      middleName,
      lastName,
      city,
      street,
      phone,
      grade,
      gName,
      gPhone,
      gEmail
    );
    setCity('');
    setEmail('');
    setPassword('');
    setImage(null);
    setFirstName('');
    setGemail('');
    setGname('');
    setGphone('');
    setGrade('');
    setLastName('');
    setMiddleName('');
    setPhone('');
    setSteet('');
    setRoleType('');
    swal('', 'success', 'success');
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate('/register');
  }, [user, loading, error, navigate]);

  return (
    <div className="grid min-h-screen place-items-center">
      <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
        <h1 className="text-2xl font-bold text-center">
          Adding New User
          <br />
          <span className="font-normal text-center my-1">
            Please fill in User information
          </span>
        </h1>
        <div className="mt-6">
          <div className="mb-4 	">
            <div className="App">
              <form onSubmit={formHandler}>
                <div className="mt-1 flex items-center">
                  <img
                    className="inline-block h-20 w-20 rounded-full overflow-hidden bg-gray-100"
                    alt="other"
                    src={image || 'https://via.placeholder.com/150'}
                  />
                  <label
                    htmlFor="imageUpload"
                    type="button"
                    className="ml-5  bg-normalPurple py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-white hover:bg-tBlue focus:outline-none focus:ring-2 focus:ring-offset-2"
                  >
                    Select Image File
                  </label>
                  <input
                    type="file"
                    id="imageUpload"
                    style={{ display: 'none' }}
                    className="input"
                  />

                  <button
                    className="ml-5  bg-normalPurple py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-white hover:bg-tBlue focus:outline-none focus:ring-2 focus:ring-offset-2"
                    type="submit"
                  >
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex justify-between gap-3">
            <span className="w-1/2">
              <label
                htmlFor="firstName"
                className="block text-xs font-semibold text-gray-600 uppercase"
              >
                Firstname
              </label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                required
              />
            </span>
            <span className="w-1/2">
              <label
                htmlFor="middleName"
                className="block text-xs font-semibold text-gray-600 uppercase"
              >
                Middle Name
              </label>
              <input
                id="middlename"
                type="text"
                name="middleName"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                required
              />
            </span>
            <span className="w-1/2">
              <label
                htmlFor="lastName"
                className="block text-xs font-semibold text-gray-600 uppercase"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                required
              />
            </span>
          </div>

          <div className="flex justify-between gap-3">
            <span className="w-1/2">
              <label
                htmlFor="city"
                className="block text-xs font-semibold text-gray-600 uppercase"
              >
                City
              </label>
              <input
                id="city"
                type="text"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                required
              />
            </span>
            <span className="w-1/2">
              <label
                htmlFor="street"
                className="block text-xs font-semibold text-gray-600 uppercase"
              >
                Street{' '}
              </label>
              <input
                id="street"
                type="text"
                name="street"
                value={street}
                onChange={(e) => setSteet(e.target.value)}
                className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                required
              />
            </span>
          </div>
          <select
            id="accountType"
            value={roleType}
            onChange={(e) => setRoleType(e.target.value)}
            name="accountType"
            className="form-select block w-full p-3 mt-4 text-gray-700 bg-gray-200  focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
          >
            <option value="" selected disabled hidden>
              Choose Account Type
            </option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          {(() => {
            if (roleType === 'student') {
              return (
                <>
                  <input
                    id="grade"
                    type="number"
                    name="grade"
                    placeholder="Student Grade"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                    required
                  />
                  <input
                    id="gName"
                    type="text"
                    name="gName"
                    placeholder="Guardian Name"
                    value={gName}
                    onChange={(e) => setGname(e.target.value)}
                    className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                    required
                  />
                  <input
                    id="gPhone"
                    type="tel"
                    name="gPhone"
                    value={gPhone}
                    onChange={(e) => setGphone(e.target.value)}
                    placeholder="Guardian Phone"
                    className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                    required
                  />
                  <input
                    id="gEmail"
                    type="email"
                    name="gEmail"
                    placeholder="Guardian Email"
                    value={gEmail}
                    onChange={(e) => setGemail(e.target.value)}
                    className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                    required
                  />
                </>
              );
            }
          })()}
          <label
            htmlFor="email"
            className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >
            E-mail
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
          />
          <label
            htmlFor="phone"
            className="block text-xs mt-2 font-semibold text-gray-600 uppercase"
          >
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
          />
          <label
            htmlFor="password"
            className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
          />
          <button
            onClick={register}
            className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
