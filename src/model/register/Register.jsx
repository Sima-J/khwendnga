import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db, storage } from '../../controller';
import { setDoc, doc, Timestamp, updateDoc } from 'firebase/firestore';
import { useHistory } from 'react-router-dom';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import swal from 'sweetalert';

const Register = () => {
  const [roleType, setRoleType] = useState('');

  const [image, setImage] = useState(null);
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
  const [data, setData] = useState({
    name: '',
    middleName: '',
    lastName: '',
    image: null,
    street: '',
    city: '',
    phone: '',
    email: '',
    password: '',
    grade: '',
    gName: '',
    gPhone: '',
    gEmail: '',
    error: null,
    loading: false,
  });
  const email1 = 's1@gmail.com';
  const password1 = '12345678';
  const userId = 'RbHfiu4gtxRNg94tzBsSpXtaU6g1';

  const history = useHistory();

  const {
    name,
    middleName,
    lastName,
    street,
    city,
    phone,
    email,
    password,
    grade,
    gName,
    gPhone,
    gEmail,
    error,
    loading,
  } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!name || !email || !password) {
      setData({ ...data, error: 'All fields are required' });
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        name,
        middleName,
        lastName,
        image,
        street,
        city,
        phone,
        email,
        grade,
        gName,
        gPhone,
        gEmail,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });
      await setDoc(doc(db, 'roles', result.user.uid), {
        uid: result.user.uid,
        roleType,
      });
      setData({
        name: '',
        middleName: '',
        lastName: '',
        image: null,
        street: '',
        city: '',
        phone: '',
        email: '',
        password: '',
        grade: '',
        gName: '',
        gPhone: '',
        gEmail: '',
        error: null,
        loading: false,
      });
      signInWithEmailAndPassword(auth, email1, password1);
      await updateDoc(doc(db, 'users', userId), {
        isOnline: true,
      });
      setData({
        name: '',
        middleName: '',
        lastName: '',
        image: null,
        street: '',
        city: '',
        phone: '',
        email: '',
        password: '',
        gName: '',
        gPhone: '',
        gEmail: '',
        roleType: '',
        error: null,
        loading: false,
      });
      swal('', 'success', 'success');

      history.replace('/register');
    } catch (err) {
      setData({ ...data, error: err.message, loading: false });
    }
  };
  console.log(roleType);

  return (
    <div className="grid min-h-screen w-screen  p-12 place-items-center">
      <div className="w-11/12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
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
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between gap-3">
              <span className="w-1/2">
                <label
                  htmlFor="name"
                  className="block text-xs font-semibold text-gray-600 uppercase"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  className="block w-full p-4 mt-2  mb-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
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
                  type="text"
                  name="middleName"
                  value={middleName}
                  onChange={handleChange}
                  className="block w-full p-4 mt-2  mb-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
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
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                  className="block w-full p-4 mt-2 mb-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
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
                  type="text"
                  name="city"
                  value={city}
                  onChange={handleChange}
                  className="block w-full p-4 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
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
                  type="text"
                  name="street"
                  value={street}
                  onChange={handleChange}
                  className="block w-full p-4 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                  required
                />
              </span>
            </div>
            <select
              id="accountType"
              value={roleType}
              onChange={(e) => setRoleType(e.target.value)}
              name="accountType"
              className="form-select block w-full p-4 mt-4 text-gray-700 bg-gray-200  focus:outline-none focus:bg-gray-300 focus:shadow-inner"
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
                    <select
                      id="grade"
                      name="grade"
                      placeholder="Student Grade"
                      value={grade}
                      onChange={handleChange}
                      className="form-select block w-full p-4 mt-4 text-gray-700 bg-gray-200  focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                      required
                    >
                      <option value="" selected disabled hidden>
                        Choose Grade Type
                      </option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <input
                      type="text"
                      name="gName"
                      placeholder="Guardian Name"
                      value={gName}
                      onChange={handleChange}
                      className="block w-full p-4 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                      required
                    />
                    <input
                      type="tel"
                      name="gPhone"
                      value={gPhone}
                      onChange={handleChange}
                      placeholder="Guardian Phone"
                      className="block w-full p-4 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                      required
                    />
                    <input
                      id="gEmail"
                      type="email"
                      name="gEmail"
                      placeholder="Guardian Email"
                      value={gEmail}
                      onChange={handleChange}
                      className="block w-full p-4 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
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
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="block w-full p-4 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              required
            />
            <label
              htmlFor="phone"
              className="block text-xs mt-2 font-semibold text-gray-600 uppercase"
            >
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={handleChange}
              className="block w-full p-4 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              required
            />
            <label
              htmlFor="password"
              className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="block w-full p-4 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              required
            />
            {error ? <p className="error">{error}</p> : null}
            <div className="btn_container">
              <button className="btn" disabled={loading}>
                {loading ? 'Creating ...' : 'Register'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
