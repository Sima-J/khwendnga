import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import uuid from 'react-uuid';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { db, storage } from '../../../controller';
import { FetchCourses } from '../../../controller';
import { doc } from 'firebase/firestore';

export default function AddItemForm() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);

  const [Images, setImages] = useState([]);
  const [assignement, setAssignement] = useState([]);
  const [video, setVideos] = useState([]);
  const [loading, setloading] = useState(false);
  const [courseData, setCourseData] = useState({
    categories: {},
  });

  useEffect(() => {
    setCourseData({
      ...courseData,
    });
  }, [courses]);

  const removeImg = (index) => {
    const imgs = [...Images];
    imgs.splice(index, 1);
    setImages(imgs);
  };

  const handleChnage = (e) => {
    if (e.target.name === 'imageInput') {
      if (e.target.files.length + Images.length < 4) {
        setImages([...Images, ...e.target.files]);
      }
    } else if (e.target.name === 'asgInput') {
      if (e.target.files.length + assignement.length < 3) {
        setAssignement([...assignement, ...e.target.files]);
      }
    } else if (e.target.name === 'videoInput') {
      if (e.target.files.length + assignement.length < 3) {
        setVideos([...video, ...e.target.files]);
      }
    } else {
      setCourseData({
        ...courseData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ImageRef = [];

    for (let i = 0; i < Images.length; i += 1) {
      const UUID = uuid();
      const fileRef = storage.child(UUID + Images[i].name);
      // eslint-disable-next-line no-await-in-loop
      await fileRef.put(Images[i]);
      // eslint-disable-next-line no-await-in-loop
      const fileUrl = await fileRef.getDownloadURL();
      ImageRef.push(fileUrl);
    }
    const AsgRef = [];

    for (let i = 0; i < assignement.length; i += 1) {
      const UUID = uuid();
      const fileRef = storage.child(UUID + assignement[i].name);
      // eslint-disable-next-line no-await-in-loop
      await fileRef.put(assignement[i]);
      // eslint-disable-next-line no-await-in-loop
      const fileUrl = await fileRef.getDownloadURL();
      AsgRef.push(fileUrl);
    }
    const VideoRef = [];

    for (let i = 0; i < video.length; i += 1) {
      const UUID = uuid();
      const fileRef = storage.child(UUID + video[i].name);
      // eslint-disable-next-line no-await-in-loop
      await fileRef.put(video[i]);
      // eslint-disable-next-line no-await-in-loop
      const fileUrl = await fileRef.getDownloadURL();
      VideoRef.push(fileUrl);
    }

    const userRef = doc(db, 'courses');
    userRef
      .set(
        {
          sectionName: courseData.title,
          assignment: AsgRef,
          description: courseData.description,
          deadline: courseData.dealine,
          uui: courses.courses.uui,
          images: ImageRef,
          video: VideoRef,
        },
        { merge: true }
      )

      .then(() => {
        dispatch(FetchCourses);
      });
    const item = courseData.title.toUpperCase();
    setloading(false);
    swal('', ` | ${item} | has been added`, 'success');
    setCourseData({
      date: new Date().toString(),
      title: '',
      assignment: '',
      description: '',
      uui: courses.courses.uui,
      images: '',
      video: '',
      deadline: '',
    });
    setImages([]);
    setAssignement([]);
    setVideos([]);
  };

  return (
    <div className=" bg-pureWhite p-8">
      <SweetAlert
        title=""
        show={loading}
        showConfirm={false}
        closeOnClickOutside
        onCancel={() => setloading(false)}
        style={{ backgroundColor: 'transparent' }}
      >
        <div className="bg-blue bg-opacity-70 rounded-3xl px-32 py-10 shadow-md ">
          <FontAwesomeIcon
            icon="spinner"
            className="text-white mb-5"
            pulse
            size="7x"
          />
          <h1 className="text-white m-3 mt-4 text-3xl">loading</h1>
        </div>
      </SweetAlert>

      <div className="  p-4  w-full">
        <div className="text-4xl mb-10 text-center text-darkBlue font-bold py-4  shadow rounded border">
          lllll{' '}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1    gap-8 md:grid-cols-11   my-4 ">
            <div className="grid gap-10  md:col-span-6">
              <div>
                <label
                  htmlFor="title"
                  className="md:text-xl text-blue font-semibold"
                >
                  additem.title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={courseData.title}
                  onChange={handleChnage}
                  className="border-b-2 border-blue  p-3  md:text-xl w-full focus:border-darkBlue focus:outline-none"
                />
              </div>
            </div>

            <div className="grid gap-10 md:col-span-5">
              <div className=" p-12 item-center border-2 border-blue border-dashed rounded-3xl text-center">
                <div className="grid  pb-4 p-1   ">
                  <FontAwesomeIcon
                    icon="images"
                    className="fa-3x my-3 text-blue justify-self-center"
                  />
                  {Images[0] ? (
                    Images.map((img, index) => {
                      return (
                        <div className="m-1 grid grid-cols-12  rounded   border px-0  ">
                          <p className="bg-blue rounded-l inline py-1   text-white text-center col-span-1">
                            {index + 1}
                          </p>
                          <p className="px-2 self-center text-left col-span-10 overflow-hidden">
                            {img.name}
                          </p>

                          <button
                            type="button"
                            className="text-red border-l focus:outline-none  justify-self-end px-2 rounded-r col-span-1"
                            onClick={() => removeImg(index)}
                          >
                            X
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <p>number image</p>
                  )}
                </div>
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer  rounded-md font-medium hover:shadow-none shadow-lg transition duration-300 ease-in-out hover:bg-darkBlue text-white bg-blue py-2 px-2"
                >
                  <span>additem.upload</span>
                  <input
                    id="file-upload"
                    name="imageInput"
                    type="file"
                    accept="image/png, image/jpeg"
                    multiple
                    className="sr-only"
                    onChange={handleChnage}
                  />
                </label>
              </div>
            </div>
            <div className="md:col-span-11">
              <label
                htmlFor="Description"
                className="md:text-xl text-blue font-semibold"
              >
                proudctDetail.description
              </label>

              <textarea
                cols="1"
                rows="1"
                name="description"
                required
                value={courseData.description}
                className="border-b-2 border-blue  py-3   md:text-xl w-full h-24  focus:border-darkBlue focus:outline-none"
                onChange={handleChnage}
              />
            </div>

            <div className="md:col-span-5  text-center">
              <button
                type="submit"
                onClick={() => setloading(true)}
                className="py-3 px-6 rounded-2xl focus:outline-none shadow-md hover:shadow-none  bg-blue text-white font-bold w-full sm:w-28 transition duration-300  ease-in-out"
              >
                additem.add
              </button>
            </div>
            <div className="md:col-span-5  text-center">
              <input
                value="additem.cancel"
                type="button"
                onClick={() => history.goBack()}
                className="py-3 px-6   focus:outline-none text-blue shadow-md hover:shadow-none border rounded-2xl border-blue hover:bg-blue hover:text-white font-bold w-full sm:w-28 transition duration-300  ease-in-out"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
