import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, storage, db } from '../../../controller';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import swal from 'sweetalert';

export default function AddDetails() {
  const [firstName, setFirstName] = useState('');
  const [image, setImage] = useState(null);
  const [courseImage, setCourseImage] = useState(null);
  const [courseLevel, setCourseLevel] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [uid, setUid] = useState('');

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
    const sotrageRef = ref(storage, `course/${file.name}`);
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
          setCourseImage(downloadURL);
        });
      }
    );
  };
  const addCourse = (e) => {
    e.preventDefault();
    addDoc(collection(db, 'courses'), {
      courseImage,
      courseName,
      courseCode,
      courseLevel,
      firstName,
      image,
      uid,
    });

    setCourseImage(null);
    setCourseName('');
    setCourseCode('');
    setCourseLevel('');
    swal('', 'success', 'success');
  };

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setFirstName(data.firstName);
      setUid(user?.uid);
      setImage(data.image);
    } catch (err) {
      console.error(err);
      alert('An error occured while fetching user data');
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/');

    fetchUserName();
  }, [user, loading]);
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
        <h1 className="text-2xl font-bold text-center">
          Adding New Course Teacher {firstName}
          <br />
          <span className="font-normal text-center my-1">
            Please fill in Course information
          </span>
        </h1>
        <div className="mt-6">
          <div className="mb-4 	">
            <div className="App">
              <form onSubmit={formHandler}>
                <div className="mt-1 flex items-center">
                  <img
                    className="inline-block h-24 w-24 overflow-hidden bg-gray-100"
                    alt="other"
                    src={courseImage || 'https://via.placeholder.com/150'}
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
                htmlFor="courseName"
                className="block text-xs font-semibold text-gray-600 uppercase"
              >
                Course Name
              </label>
              <input
                id="courseName"
                type="text"
                name="courseName"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                required
              />
            </span>
            <span className="w-1/2">
              <label
                htmlFor="courseCode"
                className="block text-xs font-semibold text-gray-600 uppercase"
              >
                Course Code
              </label>
              <input
                id="courseCode"
                type="text"
                name="courseCode"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                required
              />
            </span>
          </div>

          <select
            id="courseLevel"
            value={courseLevel}
            onChange={(e) => setCourseLevel(e.target.value)}
            name="accountType"
            className="form-select block w-full p-3 mt-4 text-gray-700 bg-gray-200  focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
          >
            <option value="" selected disabled hidden>
              Choose Course Level
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="3">4</option>
            <option value="3">5</option>
            <option value="3">6</option>
          </select>

          <button
            onClick={addCourse}
            className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
