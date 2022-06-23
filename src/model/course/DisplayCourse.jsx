import React from 'react';
import { useSelector } from 'react-redux';
import CourseSection from './CourseSection';
import PropTypes from 'prop-types';

export default function DisplayCourse({ condition }) {
  const assignments = useSelector((state) => state.assignments);

  return (
    <>
      {assignments.loading === false ? (
        assignments.data
          .filter((item) => item.submission === condition)
          .map((item) => {
            return (
              <div>
                <CourseSection
                  assignmentImage1={item.assignmentImage1}
                  assignmentImage2={item.assignmentImage2}
                  video={item.video}
                  details={item.details}
                  date={item.date}
                  file1={item.file1}
                  courseId={item.courseId}
                  teacherId={item.teacherId}
                  id={item.id}
                  title={item.title}
                  submission={item.submission}
                />
              </div>
            );
          })
      ) : (
        <div>No data...</div>
      )}
    </>
  );
}

DisplayCourse.propTypes = {
  condition: PropTypes.string,
};

DisplayCourse.defaultProps = {
  condition: '',
};
