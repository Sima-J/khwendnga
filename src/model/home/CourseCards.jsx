import React from 'react';
import chat from '../../assets/disscuss.svg';
import course from '../../assets/course.svg';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function CourseCards({
  courseImage,
  id,
  courseName,
  courseCode,
  courseLevel,
  name,
  image,
}) {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/course/${id}`);
  };
  return (
    <div className="w-full max-w-sm text-black mx-auto rounded-lg shadow-lg overflow-hidden mb-4 mt-2">
      <div
        className="flex items-end justify-end h-56 w-full bg-cover"
        style={{ backgroundImage: `url(${courseImage})` }}
      >
        <button className="p-2 rounded-full bg-yellow text-white mx-5 -mb-6 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
          <img src={chat} alt="chatIcon" className="w-8 h-8" />
        </button>
      </div>
      <div className="px-5 py-3">
        <span className="text-black text-lg uppercase font-bold text-darkPurple">
          <h3>
            {courseName} - {courseCode}
          </h3>
        </span>
      </div>
      <div id="header" className="flex items-center px-5 py-3 mb-2">
        <img
          alt="avatar"
          className="w-24 h-24 rounded-full border-2 border-gray-300"
          src={image}
        />
        <div id="header-text" className="leading-5 ml-6 sm">
          <h4 id="name" className="text-xl font-semibold">
            Teacher {name}
          </h4>
          <h4 id="name" className="text-xl  font-semibold">
            Grade: {courseLevel}
          </h4>
        </div>
      </div>
      <button
        onClick={handleClick}
        onKeyDown={handleClick}
        className="flex items-center  w-1/2 mb-4  mx-auto mt-4 px-3 py-2 bg-normalPurple  text-sm uppercase font-medium rounded-md hover:bg-darkPurple focus:outline-none focus:bg-darkPurple"
      >
        <img src={course} className="w-1/5 mr-2" alt="chat" />{' '}
        <span className="text-white">View Details</span>
      </button>
    </div>
  );
}
CourseCards.propTypes = {
  courseImage: PropTypes.string,
  id: PropTypes.number,
  courseName: PropTypes.string,
  courseCode: PropTypes.string,
  courseLevel: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
};

CourseCards.defaultProps = {
  image: course,
  courseImage: course,
  id: 0,
  courseName: '',
  courseCode: '',
  courseLevel: '',
  name: '',
};
