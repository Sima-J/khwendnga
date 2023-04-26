import React from "react";
import { useSelector } from "react-redux";
import CourseAssignment from "./CourseAssignment";
import PropTypes from "prop-types";

export default function DisplayAssignment({ condition }) {
  const assignments = useSelector((state) => state.assignments);

  return (
    <>
      {assignments.loading === false ? (
        assignments.data
          .filter((item) => item.submission === condition)
          .map((item) => {
            return (
              <div>
                <CourseAssignment
                  assignmentImage1={item.assignmentImage1}
                  video={item.video}
                  details={item.details}
                  date={item.date}
                  file1={item.file1}
                  courseId={item.courseId}
                  teacherId={item.teacherId}
                  id={item.id}
                  title={item.title}
                  submission={item.submission}
                  asgTitle={item.asgTitle}
                  asgDesc={item.asgDesc}
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

DisplayAssignment.propTypes = {
  condition: PropTypes.string,
};

DisplayAssignment.defaultProps = {
  condition: "",
};
