import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLottie } from "lottie-react";
import error from "../assets/error.json"; // 👈 apne Vite project ke assets folder mein rakho

const style = {
  height: 300,
};

export default function LoginFailure() {
  const navigate = useNavigate();

  // Redirect after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timer); // cleanup
  }, [navigate]);

  const options = {
    animationData: error,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options, style);

  return (
    <div className="h-screen flex items-center justify-center">
      {View}
    </div>
  );
}
