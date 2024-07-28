// src/components/GameSelection.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { WavyBackground } from "./ui/wavy-background";
import { AnimatedModalDemo } from "./Modal";

export default function GameSelection() {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    // Check if name is in location state
    if (location.state && location.state.name) {
      setName(location.state.name);
    } else {
      // If name is not in state, get it from Firestore
      const fetchUserData = async () => {
        if (auth.currentUser) {
          const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
          const userData = userDoc.data();
          setName(userData.name);
        }
      };
      fetchUserData();
    }
  }, [location.state]);

  return (
    <div>
      <WavyBackground className="max-w-4xl mx-auto pb-40">
      <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
        Welcome, {name}!
      </p>
      <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
        Go on, define your choices to play!
      </p>
      <AnimatedModalDemo></AnimatedModalDemo>
    </WavyBackground>

    </div>
  )
};