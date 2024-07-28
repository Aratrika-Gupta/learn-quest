"use-clienr"
import React from "react";
import { Vortex } from "./ui/vortex";
import { Link } from "react-router-dom";
import ShootingStars from "./ui/shootingstars";
import StarsBackground from "./ui/stars-background";

export default function HeroSection() {
  return (

    <div className="w-[calc(100%-4rem)] mx-auto rounded-md  h-[30rem] overflow-hidden">
      <ShootingStars />
      <StarsBackground />
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
          LearnQuest
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
          Redefining Education.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
        <Link to="/register">
        <button className="p-[3px] relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
            Register
          </div>
          </button>
          </Link>
          <Link to="/login">
          <button className="px-4 py-2 bg-transparent text-white ">Login</button>
          </Link>
        </div>
      </Vortex>
    </div>
  );
}

