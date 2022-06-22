import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CourseHero from './courseHero';

export default function CourseDetails() {
  const courses = useSelector((state) => state.courses);
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(courses.data.find((item) => item.id === id));
  }, [courses, id]);
  console.log(courses);

  return (
    <>
      <div>
        {data ? (
          <>
            <CourseHero
              firstName={data.firstName}
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
      </div>
    </>
  );
}
