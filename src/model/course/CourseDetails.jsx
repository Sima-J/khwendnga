import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CourseHero from './CourseHero';
import { db, auth } from '../../controller';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router-dom';
import { query, collection, getDocs, where } from 'firebase/firestore';

export default function CourseDetails() {
  const courses = useSelector((state) => state.courses);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [user] = useAuthState(auth);
  const [roleType, setRoleType] = useState('');
  const history = useHistory();

  const fetchUserRole = async () => {
    try {
      const q = query(collection(db, 'roles'), where('uid', '==', user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setRoleType(data.roleType);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    setData(courses.data.find((item) => item.id === id));
    fetchUserRole();
  }, [courses, id]);

  return (
    <>
      <div>
        {data ? (
          <>
            <CourseHero
              name={data.name}
              courseImage={data.courseImage}
              courseName={data.courseName}
              courseLevel={data.courseLevel}
            />
          </>
        ) : (
          <div className="grid justify-center items-center h-screen max-w-screen-xl w-screen ">
            <FontAwesomeIcon
              icon="spinner"
              spin
              size="10x"
              className="text-blue "
            />
          </div>
        )}
        {roleType === 'teacher' ? (
          <button
            class="items-center mx-auto  block w-1/2 bg-normalPurple mb-6 mt-4 py-3 rounded-2xl text-white font-semibold mb-2"
            onClick={() => {
              history.push(`/courses/${id}/addAssignment`);
            }}
          >
            {' '}
            Add New Course
          </button>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
