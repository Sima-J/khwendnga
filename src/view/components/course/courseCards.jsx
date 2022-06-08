import React from 'react';
import chat from '../../../assets/disscuss.svg';
import course from '../../../assets/course.svg';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function CourseCards({
  courseImage,
  id,
  courseName,
  courseCode,
  courseLevel,
  firstName,
  image,
}) {
  const history = useNavigate();

  const handleClick = () => {
    history(`/course/${id}`);
  };
  return (
    <div class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden mb-4 mt-2">
      <div
        class="flex items-end justify-end h-56 w-full bg-cover"
        style={{ backgroundImage: `url(${courseImage})` }}
      >
        <button class="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
          <img src={chat} alt="chatIcon" class="w-8 h-8" />
        </button>
      </div>
      <div class="px-5 py-3">
        <h3 class="text-gray-700 uppercase">{courseName}</h3>
      </div>
      <div id="header" class="flex items-center px-5 py-3 mb-2">
        <img
          alt="avatar"
          class="w-20 rounded-full border-2 border-gray-300"
          src={image}
        />
        <div id="header-text" class="leading-5 ml-6 sm">
          <h4 id="name" class="text-xl font-semibold">
            {firstName}
          </h4>
        </div>
      </div>
      <button
        onClick={handleClick}
        onKeyDown={handleClick}
        class="flex items-center  w-1/2 mb-4  ml-5 mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
      >
        <img src={course} class="w-1/5 mr-2" alt="chat" />{' '}
        <span>View Details</span>
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
  firstName: PropTypes.string,
  image: PropTypes.string,
};

CourseCards.defaultProps = {
  image: course,
  courseImage: course,
  id: 0,
  courseName: '',
  courseCode: '',
  courseLevel: '',
  firstName: '',
};
