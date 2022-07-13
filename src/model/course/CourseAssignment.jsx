import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import origin from '../../assets/origin.svg';
import origin1 from '../../assets/origin1.svg';
import origin2 from '../../assets/origin2.svg';
import movie from '../../assets/move1.webm';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, storage, db } from '../../controller';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import {
  collection,
  setDoc,
  getDocs,
  query,
  where,
  addDoc,
} from 'firebase/firestore';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

export default function CourseAssignment({
  title,

  assignmentImage1,
  assignmentImage2,
  video,
  details,
  date,
  file1,
  asgTitle,
  courseId,

  asgDesc,
}) {
  const [file11, setFile11] = useState(null);
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [progress, setProgress] = useState(0);

  const formFile1Handler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles4(file);
    addDoc(collection(db, 'grades'), {
      file11,
      name,
      middleName,
      lastName,
      asgTitle,
      courseId,
      studentId: user?.uid,
    });

    swal('', 'success', 'success');
  };

  const uploadFiles4 = (file) => {
    //
    if (!file) return;
    const sotrageRef = ref(storage, `grades/${file.name}`);
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
          setFile11(downloadURL);
        });
      }
    );
  };

  const fetchInfo = async () => {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
      setMiddleName(data.middleName);
      setLastName(data.lastName);
    } catch (err) {
      console.error(err);
      alert('An error occured while fetching user data');
    }
  };
  const history = useHistory();
  useEffect(() => {
    if (loading) return;

    fetchInfo();
  }, [loading]);

  return (
    <div className="px-4 py-16 mx-auto  md:px-24 lg:px-8 lg:py-20">
      <div className="grid gap-4 row-gap-4 lg:grid-cols-1">
        <div className=" mb-6 lg:col-span-2">
          <h1 className="mb-6  text-6xl font-bold tracking-tight text-normalPurple sm:text-4xl sm:leading-none">
            {title}
          </h1>
          <p className="text-base text-2xl text-gray-700 md:text-xl">
            {details}
          </p>
        </div>
        <div className="flex flex-col justify-center">
          <div className="grid gap-4 row-gap-6 sm:grid-cols-2">
            <div className="  shadow-sm border-deep-purple-accent-400">
              <img
                className="object-cover w-full h-52 rounded shadow-lg sm:h-96"
                src={assignmentImage1}
                alt="assignmentImage1"
              />
            </div>
            <div className="  shadow-sm border-deep-purple-accent-400">
              <img
                className="object-cover w-full h-52 rounded shadow-lg sm:h-96"
                src={assignmentImage2}
                alt="assignmentImage1"
              />
            </div>
          </div>
        </div>
        <div className="mx-auto w-fit lg:col-span-2">
          <ReactPlayer
            loop
            controls
            className="  border rounded-md shadow-sm "
            url={video}
          />
        </div>
        <div className="lg:col-span-2">
          <h2 className=" mb-2 mt-2 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
            {asgTitle}
          </h2>
          <p className="text-base text-center text-2xl mb-4 mx-auto text-gray-700 md:text-xl">
            {asgDesc}
          </p>

          <div className="flex justify-center items-center">
            <iframe
              src={file1}
              width="60%"
              height="600px"
              title="asg"
              className=" border rounded-md shadow-sm"
            ></iframe>

            <div className=" ml-4">
              <p className="text-base  text-2xl mb-4 mx-auto text-gray-700 md:text-xl">
                The Deadline for this assessments:
                <text className="text-red font-bold">{date}</text>{' '}
              </p>
              <p className="text-base  text-2xl mb-4 mx-auto text-gray-purple md:text-xl">
                Submit Your Solution Below{' '}
              </p>
              <form onSubmit={formFile1Handler}>
                <div className="mt-2 flex justify-center items-center">
                  <iframe
                    src={file11}
                    width="90%"
                    height="500px"
                    title="asg"
                    className=" border rounded-md shadow-sm"
                  ></iframe>
                </div>
                <div className="mt-2 flex justify-center items-center">
                  <label
                    htmlFor="file1Upload"
                    type="button"
                    className="ml-5  bg-normalPurple py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-white hover:bg-tBlue focus:outline-none focus:ring-2 focus:ring-offset-2"
                  >
                    Select File
                  </label>
                  <input
                    type="file"
                    id="file1Upload"
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
        </div>
      </div>
    </div>
  );
}

CourseAssignment.propTypes = {
  assignmentImage1: PropTypes.string,
  assignmentImage2: PropTypes.string,
  video: PropTypes.string,
  details: PropTypes.string,
  date: PropTypes.string,
  file1: PropTypes.string,
  courseId: PropTypes.string,
  asgTitle: PropTypes.string,
  asgDesc: PropTypes.string,
  teacherId: PropTypes.string,
  title: PropTypes.string,
  submission: PropTypes.string,
};

CourseAssignment.defaultProps = {
  assignmentImage1: origin,
  assignmentImage2: origin1,
  video: movie,
  details: '',
  asgTitle: '',
  asgDesc: '',
  date: '',
  file1: origin2,
  courseId: '',
  teacherId: '',
  title: '',
  submission: '',
};
