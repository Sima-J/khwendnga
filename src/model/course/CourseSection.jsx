import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import origin from '../../assets/origin.svg';
import origin1 from '../../assets/origin1.svg';
import origin2 from '../../assets/origin2.svg';
import movie from '../../assets/move1.webm';

export default function CourseSection({
  title,
  id,
  assignmentImage1,
  assignmentImage2,
  video,
  details,
  date,
  file1,
  asgTitle,
  courseId,
  submission,
  teacherId,
  asgDesc,
}) {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid gap-5 row-gap-6 lg:grid-cols-2">
        <div className="max-w-xl mb-6 lg:col-span-2">
          <h1 className="max-w-lg mb-6  text-6xl font-bold tracking-tight text-normalPurple sm:text-4xl sm:leading-none">
            {title}
          </h1>
          <p className="text-base text-2xl text-gray-700 md:text-xl">
            {details}
          </p>
        </div>
        <div className="flex flex-col justify-center">
          <div className="grid gap-5 row-gap-8 sm:grid-cols-2">
            <div className="  shadow-sm border-deep-purple-accent-400">
              <img
                className="object-cover w-full h-52 rounded shadow-lg sm:h-96"
                src={assignmentImage1}
                alt="assignmentImage1"
              />
            </div>
            <div className="  shadow-sm border-deep-purple-accent-400">
              <img
                className="object-cover w-full h-52 rounded shadow-lg sm:h-96"
                src={assignmentImage2}
                alt="assignmentImage1"
              />
            </div>
          </div>
        </div>
        <div className="m-auto">
          <ReactPlayer
            playing
            loop
            controls
            className="  border rounded-md shadow-sm "
            url={video}
          />
        </div>
        <div className="lg:col-span-2">
          <div className="flex justify-center items-center">
            <iframe
              src={file1}
              width="60%"
              height="600px"
              title="asg"
              className=" border rounded-md shadow-sm"
            ></iframe>
          </div>
        </div>
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
  assignmentImage2: PropTypes.string,
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
  assignmentImage1: origin,
  assignmentImage2: origin1,
  video: movie,
  details: '',
  asgTitle: '',
  asgDesc: '',
  date: '',
  file1: origin2,
  courseId: '',
  teacherId: '',
  id: 0,
  title: '',
  submission: '',
};
