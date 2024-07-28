import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from 'react-router-dom';
import ShootingStars from "./ui/shootingstars";
import StarsBackground from "./ui/stars-background";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user profile to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
      });

      console.log("User registered and profile saved:", user);
      // Redirect to game selection page
      navigate('/game');
    } catch (err) {
      console.error("Error registering user:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
            <ShootingStars/>
            <StarsBackground/>
      <form className="one z-10 flex flex-col gap-5" onSubmit={handleRegister}>
      <div className="input-container z-10 flex flex-col gap-4 space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <Label className="text-white">Name</Label>
          <Input className="input"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-container z-10 flex flex-col gap-4 space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <Label className="text-white">Email</Label>
          <Input className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-container z-10 flex flex-col gap-4 space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <Label className="text-white">Password</Label>
          <Input className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message text-white mt-10">{error}</p>}
        <button className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]" type="submit">Register <BottomGradient /></button>
      </form>
    </div>
  );
}

export default Register;

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
