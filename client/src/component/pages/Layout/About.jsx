import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section id="about" className="text-white py-20 z-10 inset-0 bg-[radial-gradient(circle_farthest-corner,var(--color-blue-900)_50%,var(--color-indigo-900)_75%,transparent)] [mask-image:radial-gradient(circle_farthest-side,black,transparent)]">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-extrabold mb-6 font-heading">
          About Our Application
        </h2>
        <p className="text-lg mb-4 max-w-4xl mx-auto font-body">
          Welcome to Q&A, a platform where you can connect with other
          developers, ask questions, share knowledge, and build meaningful
          connections with like-minded individuals. Our goal is to provide a
          space that fosters collaboration, problem-solving, and growth.
        </p>
        <p className="text-md mb-8 max-w-4xl mx-auto font-body">
          Whether you're a developer seeking help with a challenging bug or
          someone looking to share your expertise, our community is here to
          support you. We believe that by asking the right questions, sharing
          valuable insights, and building connections, we can drive innovation
          and make the tech world a better place.
        </p>
      </div>
    </section>
  );
};

export default About;
