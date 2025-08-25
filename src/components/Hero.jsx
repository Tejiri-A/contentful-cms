import React from "react";
import heroImg from "../assets/webdev.svg";

const Hero = () => {
  return (
    <section className={`hero`}>
      <div className={`hero-center`}>
        <div className={`hero-title`}>
          <h1>My Projects</h1>
          <p>
            Welcome to my portfolio of creative and technical projects. Here
            you'll find a curated collection of my work, showcasing various
            technologies and solutions I've developed. Each project represents a
            unique challenge and demonstrates my commitment to quality and
            innovation.
          </p>
        </div>
        <div className={`img-container`}>
          <img className={`img`} src={heroImg} alt="woman and the browser" />
        </div>
      </div>
    </section>
  );
};
export default Hero;
