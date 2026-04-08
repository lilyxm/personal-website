import React from "react";
import {
  Main,
  Timeline,
  Expertise,
  Project,
  Contact,
  Footer,
} from "../components";
import FadeIn from '../components/FadeIn';

function HomePage() {
  return (
    <>
      <FadeIn transitionDuration={700}>
        <Main/>
        <Expertise/>
        <Timeline/>
        <Project/>
        <Contact/>
      </FadeIn>
      <Footer />
    </>
  );
}

export default HomePage;
