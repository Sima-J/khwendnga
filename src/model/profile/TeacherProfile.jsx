import React, { useState, useEffect } from "react";
import { db, auth } from "../../controller";
import { useHistory } from "react-router-dom";
import background from "../../assets/students.jpg";
import {
  query,
  collection,
  getDocs,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

export default function Profile() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalAssignments, setTotalAssignments] = useState(0);
  const [courses, setCourses] = useState([]);

  const fetchInfo = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
      setMiddleName(data.middleName);
      setLastName(data.lastName);
      setImage(data.image);
      setEmail(data.email);
      setCity(data.city);
      setStreet(data.street);
      setPhone(data.phone);

      const q2 = query(
        collection(db, "courses"),
        where("teacherId", "==", user?.uid)
      );
      const doc2 = await getDocs(q2);
      const data2 = doc2.size;
      setTotalCourses(data2);

      const q3 = query(
        collection(db, "assignments"),
        where("teacherId", "==", user?.uid),
        where("submission", "==", "yes")
      );
      const doc3 = await getDocs(q3);
      const data3 = doc3.size;
      setTotalAssignments(data3);

      const rows = [];

      doc2.forEach((doc) => {
        rows.push(doc.data());
        console.log(rows);
      });
      setCourses(rows);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  const history = useHistory();
  useEffect(() => {
    if (loading) return;
    if (!user) return history.push("/login");

    fetchInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);
  const deleteItem = (cId) => {
    console.log(cId);
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteDoc(doc(db, "courses", cId));
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your Course has been deleted.",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your Course is safe :).",
            "error"
          );
        }
      });
    window.setTimeout(function () {
      window.location.reload();
    }, 3000);
  };

  const courseItems = courses.map((course) => (
    <div
      key={course.uid}
      className="  shadow-md rounded-md border-deep-purple-accent-400  "
    >
      <img
        className="object-cover w-full h-52 rounded  sm:h-96"
        src={course.courseImage}
        alt="courseImage"
      />
      <div class="font-bold text-xl my-1">
        {course.courseName} - {course.courseCode}
      </div>
      <button
        type="button"
        className="bg-red mx-2 my-2 px-4 py-1 rounded-md text-white hover:shadow-none focus:outline-none shadow-md  transition duration-300 ease-in-out "
        onClick={() => {
          deleteItem(`${course.uid}`);
        }}
      >
        <FontAwesomeIcon icon="trash-alt" /> Delete
      </button>
      <button
        type="button"
        className="bg-yellow mx-2 my-2 px-4 py-1 rounded-md text-white drop-shadow-sm hover:shadow-none focus:outline-none shadow-md  transition duration-300 ease-in-out "
        onClick={() => {
          history.push(`/editCourse/${course.uid}`);
        }}
      >
        <FontAwesomeIcon icon="pen" /> Edit
      </button>
      <button
        type="button"
        className="bg-tBlue mx-2 my-2 px-4 py-1 rounded-md text-white drop-shadow-sm hover:shadow-none focus:outline-none shadow-md  transition duration-300 ease-in-out "
        onClick={() => {
          history.push(`/viewstudents/${course.courseLevel}`);
        }}
      >
        <FontAwesomeIcon icon="child" /> View Studnts
      </button>
    </div>
  ));

  return (
    <main className="profile-page ">
      <section className="relative block" style={{ height: "500px" }}>
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: `url(${background})`,
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-40 bg-black"
          ></span>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
          style={{ height: "70px" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-gray-300 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </section>
      <section className="relative py-16 min-h-screen mb-[-5vh] bg-gray-300">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <img
                      alt="..."
                      src={image}
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                      style={{ maxWidth: "150px" }}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <button
                      className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={() => {
                        history.push(`/editProfile/${user?.uid}`);
                      }}
                    >
                      Setting
                    </button>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                        {totalCourses}
                      </span>
                      <span className="text-sm text-gray-500">Course</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                        {totalAssignments}
                      </span>
                      <span className="text-sm text-gray-500">Assignment</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold uppercase leading-normal mb-2 text-gray-800">
                  {name}&nbsp;&nbsp;
                  {middleName}&nbsp;&nbsp;
                  {lastName}
                </h3>
                <div className="text-sm capitalize leading-normal mt-0 mb-2 text-gray-500 font-bold">
                  <FontAwesomeIcon className="mr-2" icon="envelope" />
                  {email}
                </div>
                <div className="text-sm capitalize leading-normal mt-0 mb-2 text-gray-500 font-bold">
                  <FontAwesomeIcon className="mr-2" icon="phone" />
                  {phone}
                </div>
                <div className="text-sm capitalize leading-normal mt-0 mb-2 text-gray-500 font-bold">
                  <FontAwesomeIcon className="mr-2" icon="map-marker-alt" />
                  {city}, {street}
                </div>
                <div className="pb-4">
                  <button
                    class="items-center mx-auto  block w-1/2 bg-normalPurple mb-6 mt-4 py-3 rounded-2xl text-white font-semibold"
                    onClick={() => {
                      history.push("/addCourse");
                    }}
                  >
                    <FontAwesomeIcon className="mr-2" icon="plus" /> Add New
                    Course
                  </button>
                </div>
                <div className="pb-4   my-4">
                  <div className="grid gap-6 place-items-center sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mt-6">
                    {courseItems}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
