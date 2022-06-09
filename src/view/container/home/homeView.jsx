import React from 'react';
import MainHero from '../../components/course/mainHero';
import CourseCards from '../../components/course/CourseSection';
import SecondSection from '../../components/course/secondSection';
import Navbar from '../../components/sharedComponents/navbar';

export default function homeView() {
  return (
    <>
      <Navbar />
      <MainHero />
      <div class="container mx-auto px-6 mt-4">
        <CourseCards />
        <SecondSection />
      </div>
    </>
  );
}
