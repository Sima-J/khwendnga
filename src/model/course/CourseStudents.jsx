import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { db, auth } from "../../controller";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export default function CourseStudents() {
  const { id } = useParams();
  const [user, loading] = useAuthState(auth);

  const [students, setStudents] = useState([]);

  const fetchInfo = async () => {
    try {
      const q = query(collection(db, "users"), where("grade", "==", id));
      const doc = await getDocs(q);

      const rows = [];

      doc.forEach((doc) => {
        rows.push(doc.data());
        console.log(rows);
      });
      setStudents(rows);
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
  const studentsItems = students.map((student) => (
    <tr key={student.uid} className="h-24 border-gray-300 border-b ">
      <td className="pr-6 whitespace-no-wrap">
        <div className="flex justify-center items-center">
          <div className="h-12 w-12">
            <img
              src={student.image}
              alt="students"
              className="h-full w-full rounded-full overflow-hidden shadow"
            />
          </div>
          <p className="ml-2 text-gray-800 tracking-normal leading-4 text-sm">
            {student.name}&nbsp;&nbsp;
            {student.middleName}&nbsp;&nbsp;
            {student.lastName}
          </p>
        </div>
      </td>

      <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
        {student.city}, {student.street}
      </td>
      <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
        {student.grade}
      </td>
      <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
        {student.phone}
      </td>
      <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
        {student.email}
      </td>
    </tr>
  ));

  return (
    <div className="py-10  h-screen">
      <div className="mx-auto  bg-white ">
        <div className="flex flex-col lg:flex-row p-4 lg:p-8 justify-center items-center lg:items-stretch w-full">
          <table className="w-full bg-white text-center ">
            <thead>
              <tr className="w-full h-16 border-gray-300 font-[400] text-darkPurple border-b border-t py-8">
                <th className="   pr-6  text-sm tracking-normal leading-4">
                  Student
                </th>

                <th className="  pr-6  text-sm tracking-normal leading-4">
                  Address
                </th>
                <th className="   pr-6  text-sm tracking-normal leading-4">
                  Grade
                </th>
                <th className="  pr-6  text-sm tracking-normal leading-4">
                  Phone Number
                </th>
                <th className="   pr-6  text-sm tracking-normal leading-4">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>{studentsItems}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
