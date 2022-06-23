import React from 'react';
import { DisplayCourse, CourseDetails, DisplayAssignment } from '../../model';
import { FetchAssignment } from '../../controller';
import { useDispatch } from 'react-redux';

export default function CourseView() {
  const dispatch = useDispatch();

  dispatch(FetchAssignment());

  return (
    <>
      <CourseDetails />
      <DisplayCourse condition="not" />
      <DisplayAssignment condition="yes" />
    </>
  );
}
