import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";
import origin from "../../assets/origin.svg";
import origin1 from "../../assets/origin1.svg";
import origin2 from "../../assets/origin2.svg";
import movie from "../../assets/move1.webm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage, db } from "../../controller";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {
  collection,
  setDoc,
  getDocs,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

export default function CourseAssignment({
  title,

  assignmentImage1,
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
  const [name, setName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [progress, setProgress] = useState(0);

  const formFile1Handler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles4(file);
    addDoc(collection(db, "grades"), {
      file11,
      name,
      middleName,
      lastName,
      asgTitle,
      courseId,
      studentId: user?.uid,
    });

    swal("", "success", "success");
  };

  const uploadFiles4 = (file) => {
    //
    if (!file) return;
    const sotrageRef = ref(storage, `grades/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setFile11(downloadURL);
        });
      }
    );
  };

  const fetchInfo = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
      setMiddleName(data.middleName);
      setLastName(data.lastName);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  const history = useHistory();
  useEffect(() => {
    if (loading) return;

    fetchInfo();
  }, [loading]);

  return (
    <div className="px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-16 lg:px-8 lg:py-6">
      <div className="flex flex-col gap-4 row-gap-4 ">
        <div className="max-w-xl mb-6 flex-col">
          <h1 className="max-w-lg mb-6 text-6xl font-bold tracking-tight text-normalPurple sm:text-4xl sm:leading-none">
            {title}
          </h1>
          <p className="text-base text-gray-700 md:text-xl">{details}</p>
        </div>
        {(assignmentImage1 || file1 || video) && (
          <>
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 mb-4">
                {assignmentImage1 && (
                  <div>
                    <img
                      className="object-cover w-full h-64 rounded shadow-lg sm:h-96"
                      src={assignmentImage1}
                      alt="assignmentImage1"
                    />
                  </div>
                )}
              </div>
              <div className="flex-1 mb-4">
                {video && (
                  <div className="relative " style={{ paddingBottom: "50%" }}>
                    <div className="absolute top-0 w-full h-full overflow-hidden m-auto  flex justify-center items-center">
                      <ReactPlayer
                        className="absolute top-0 "
                        url={video}
                        width="96%"
                        height="100%"
                        controls
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            {file1 && (
              <div>
                <div className="flex flex-col py-2">
                  <h2 className=" mb-2 mt-2 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                    {asgTitle}
                  </h2>
                  <p className="text-center text-2xl mb-4 mx-auto text-gray-700 md:text-xl">
                    {asgDesc}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1   mb-4">
                    <iframe
                      src={file1}
                      width="90%"
                      title="asg"
                      height={window.innerWidth < 768 ? "520px " : "420px "}
                      className="border rounded-md shadow-sm"
                    ></iframe>
                  </div>
                  <div className="flex-1 mb-4">
                    <form onSubmit={formFile1Handler}>
                      <div className="mt-2 flex justify-center items-center">
                        <iframe
                          src={file11}
                          width="90%"
                          height={window.innerWidth < 768 ? "520px " : "420px "}
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
                          style={{ display: "none" }}
                          className="input"
                        />

                        <button
                          className="ml-5  bg-normalPurple py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-white hover:bg-tBlue focus:outline-none focus:ring-2 focus:ring-offset-2"
                          type="submit"
                        >
                          Upload File {progress > 1 ? progress + "%" : ""}
                        </button>
                      </div>
                      <p className=" text-md my-2 text-center text-gray-700">
                        The Deadline for this assessments:
                        <text className="text-red font-bold">{date}</text>
                      </p>
                      <p className="  text-md  mb-2 text-center text-darkPurple ">
                        Submit Your Solution Below
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <div className="lg:col-span-2"></div>
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
  video: movie,
  details: "",
  asgTitle: "",
  asgDesc: "",
  date: "",
  file1: origin2,
  courseId: "",
  teacherId: "",
  title: "",
  submission: "",
};
