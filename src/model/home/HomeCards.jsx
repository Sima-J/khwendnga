import React from 'react';
import { useSelector } from 'react-redux';
import CourseCard from './CourseCards';

export default function HomeCards() {
  const courses = useSelector((state) => state.courses);
  return (
    <div className="mt-16">
      <h3 className="text-gray-600 text-2xl font-medium">Courses</h3>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-6">
        {courses.loading === false ? (
          courses.data.map((item) => {
            return (
              <div>
                <CourseCard
                  id={item.id}
                  firstName={item.name}
                  courseImage={item.courseImage}
                  image={item.image}
                  courseName={item.courseName}
                  courseLevel={item.courseLevel}
                  courseCode={item.courseCode}
                />
              </div>
            );
          })
        ) : (
          <div>No data...</div>
        )}
      </div>
    </div>
  );
}
