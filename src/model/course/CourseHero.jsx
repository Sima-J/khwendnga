import React from 'react';
import PropTypes from 'prop-types';

export default function CourseHero({
  courseName,
  name,
  courseLevel,
  courseImage,
  id,
}) {
  return (
    <div className="pt-24 ">
      <div
        className="container px-4 py-8 mx-auto flex flex-wrap opacity-75 brightness-90 flex-col md:flex-row items-center  bg-cover"
        style={{ backgroundImage: `url(${courseImage})` }}
      >
        <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left ">
          <h1 className="my-4 text-5xl font-bold leading-tight text-darkPurple">
            {courseName}{' '}
          </h1>
          <h2 className="my-4 capitalize  mb-8 text-5xl font-bold leading-tight text-darkPurple">
            Teacher {name}{' '}
          </h2>

          <p className="leading-normal text-5xl font-bold  mb-8 text-darkPurple">
            Grade: {courseLevel}
          </p>
          <br />
        </div>
      </div>
    </div>
  );
}

CourseHero.propTypes = {
  courseName: PropTypes.string,
  id: PropTypes.string,

  name: PropTypes.string,
  courseLevel: PropTypes.string,
  courseImage: PropTypes.string,
};

CourseHero.defaultProps = {
  courseName: '',
  name: '',
  courseLevel: '',
  courseImage: '',
  id: '',
};
