import React from 'react';
import { HomeBanner, HomeCards, SecondSection } from '../../model';

export default function HomeView() {
  return (
    <>
      <HomeBanner />
      <div class="container mx-auto px-6 mt-4">
        <HomeCards />
        <SecondSection />
      </div>
    </>
  );
}
