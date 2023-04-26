import React from "react";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";

export default function CourseSection({
  title,
  id,
  assignmentImage1,
  video,
  details,
  date,
  file1,
  submission,
  teacherId,
}) {
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
                {file1 && (
                  <div className="flex justify-center items-center my-auto">
                    <iframe
                      src={file1}
                      width="60%"
                      title="asg"
                      height={window.innerWidth < 768 ? "500px " : "380px "}
                      className="border rounded-md shadow-sm"
                    ></iframe>
                  </div>
                )}
              </div>
            </div>

            {video && (
              <div className="relative " style={{ paddingBottom: "50%" }}>
                <div className="absolute top-0 w-full h-full overflow-hidden mx-auto  flex justify-center items-center">
                  <ReactPlayer
                    className="absolute top-0 "
                    url={video}
                    width="66%"
                    height="100%"
                    controls
                  />
                </div>
              </div>
            )}
          </>
        )}
        <div className="hidden">{teacherId}</div>
        <div className="hidden">{id}</div>
        <div className="hidden">{file1}</div>
        <div className="hidden">{submission}</div>
      </div>
    </div>
  );
}

CourseSection.propTypes = {
  assignmentImage1: PropTypes.string,
  video: PropTypes.string,
  details: PropTypes.string,
  date: PropTypes.string,
  file1: PropTypes.string,
  courseId: PropTypes.string,
  asgTitle: PropTypes.string,
  asgDesc: PropTypes.string,
  teacherId: PropTypes.string,
  id: PropTypes.number,
  title: PropTypes.string,
  submission: PropTypes.string,
};

CourseSection.defaultProps = {
  assignmentImage1: "",
  video: "",
  details: "",
  asgTitle: "",
  asgDesc: "",
  date: "",
  file1: "",
  courseId: "",
  teacherId: "",
  id: 0,
  title: "",
  submission: "",
};
