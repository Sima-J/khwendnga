import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router-dom';
import { auth, storage, db } from '../../controller';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import swal from 'sweetalert';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

export default function AddAssignment() {
  const [title, setTitle] = useState('');
  const [assignmentImage1, setAssignmentImage1] = useState(null);
  const [assignmentImage2, setAssignmentImage2] = useState(null);
  const [details, setDetails] = useState('');
  const [date, setDate] = useState(new Date());
  const [video, setVideo] = useState(null);
  const [file1, setFile1] = useState(null);
  const { id } = useParams();
  const [submission, setSubmission] = useState('');

  // eslint-disable-next-line no-unused-vars
  const [progress, setProgress] = useState(0);
  const formImage1Handler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles1(file);
  };

  const uploadFiles1 = (file) => {
    //
    if (!file) return;
    const sotrageRef = ref(storage, `assignments/${file.name}`);
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
          setAssignmentImage1(downloadURL);
        });
      }
    );
  };
  const formImage2Handler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles2(file);
  };

  const uploadFiles2 = (file) => {
    //
    if (!file) return;
    const sotrageRef = ref(storage, `assignments/${file.name}`);
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
          setAssignmentImage2(downloadURL);
        });
      }
    );
  };
  const formVideoHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles3(file);
  };

  const uploadFiles3 = (file) => {
    //
    if (!file) return;
    const sotrageRef = ref(storage, `assignments/${file.name}`);
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
          setVideo(downloadURL);
        });
      }
    );
  };
  const formFile1Handler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles4(file);
  };

  const uploadFiles4 = (file) => {
    //
    if (!file) return;
    const sotrageRef = ref(storage, `assignments/${file.name}`);
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
          setFile1(downloadURL);
        });
      }
    );
  };

  const [user] = useAuthState(auth);

  const addAssignment = (e) => {
    e.preventDefault();
    addDoc(collection(db, 'assignments'), {
      title,
      assignmentImage1,
      assignmentImage2,
      video,
      details,
      date,
      file1,
      courseId: id,
      teacherId: user?.uid,
    });
    setTitle('');
    setAssignmentImage1(null);
    setAssignmentImage2(null);
    setVideo(null);
    setDetails('');
    setDate(new Date());
    setFile1(null);
    setSubmission('');
    swal('', 'success', 'success');
  };

  return (
    <div className="grid min-h-screen w-screen  p-12 place-items-center">
      <div className="w-11/12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
        <h1 className="text-2xl font-bold text-center">
          Adding New Assignment
          <br />
          <span className="font-normal text-center my-1">
            Please fill in Assignment information
          </span>
        </h1>
        <div className="mt-6">
          <div className="App">
            <form onSubmit={formImage1Handler}>
              <div className="mt-1 flex items-center">
                <img
                  className="inline-block h-24 w-24 overflow-hidden bg-gray-100"
                  alt="other"
                  src={assignmentImage1 || 'https://via.placeholder.com/400'}
                />
                <label
                  htmlFor="image1Upload"
                  type="button"
                  className="ml-5  bg-normalPurple py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-white hover:bg-tBlue focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  Select Image 1
                </label>
                <input
                  type="file"
                  id="image1Upload"
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
            <form onSubmit={formImage2Handler}>
              <div className="mt-1 flex items-center">
                <img
                  className="inline-block h-24 w-24 overflow-hidden bg-gray-100"
                  alt="other"
                  src={assignmentImage2 || 'https://via.placeholder.com/400'}
                />
                <label
                  htmlFor="image2Upload"
                  type="button"
                  className="ml-5  bg-normalPurple py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-white hover:bg-tBlue focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  Select Image 2
                </label>
                <input
                  type="file"
                  id="image2Upload"
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
            <form onSubmit={formVideoHandler}>
              <div className="mt-2 flex justify-center items-center">
                <ReactPlayer
                  playing
                  loop
                  controls
                  className="  border rounded-md shadow-sm "
                  url={video}
                />{' '}
              </div>
              <div className="mt-2 flex justify-center items-center">
                <label
                  htmlFor="videoUpload"
                  type="button"
                  className="  bg-normalPurple py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-white hover:bg-tBlue focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  Select Video
                </label>
                <input
                  type="file"
                  id="videoUpload"
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
            <form onSubmit={formFile1Handler}>
              <div className="mt-2 flex justify-center items-center">
                <iframe
                  src={file1}
                  width="100%"
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
          <div className="flex justify-between gap-3">
            <span className="w-full">
              <label
                htmlFor="title"
                className="block text-xs font-semibold text-gray-600 uppercase"
              >
                Title{' '}
              </label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                required
              />
            </span>
          </div>
          <span className="w-full">
            <label
              htmlFor="courseCode"
              className="block text-xs font-semibold mt-2 text-gray-600 uppercase"
            >
              Date{' '}
            </label>
            <input
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              required
            />
          </span>
          <span className="w-full">
            <label
              htmlFor="details"
              className="block text-xs font-semibold mt-2 text-gray-600 uppercase"
            >
              Details{' '}
            </label>
            <textarea
              type="text"
              name="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              required
            />
          </span>
          <select
            value={submission}
            onChange={(e) => setSubmission(e.target.value)}
            name="accountType"
            className="form-select block w-full p-3 mt-4 text-gray-700 bg-gray-200  focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
          >
            <option value="" selected disabled hidden>
              Do you have submission{' '}
            </option>
            <option value="yes">yes</option>
            <option value="no">no</option>
          </select>

          <button
            onClick={addAssignment}
            className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
