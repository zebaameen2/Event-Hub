


import React, { useEffect, useState } from "react";
import { GoBroadcast } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ThreeBackground from "../components/ThreeBackground";
import { useParams } from "react-router-dom"



export default function Dashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const { eventId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        // backend returns { success: true, users: [...] }
        setUsers(data.users || []);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);


  const handleSignOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("supabase.auth.token");
    navigate("/login");
  };

 
  return (
    <>
      {/* <Header /> */}
      <Header eventId={eventId} handleSignOut={handleSignOut} />
      <ThreeBackground />

      <div className="ml-64  bg-gradient-to-br from-pink-50/60 to-white backdrop-blur-sm">

        {/* Top Bar */}
        <div className="flex justify-end items-center bg-white/80 backdrop-blur-md shadow-sm py-4 px-6 sticky top-0 z-10">
          <button
            onClick={() => navigate("/profile")}
            className="bg-pink-600 text-white px-5 py-2 rounded-full shadow-md hover:scale-105 transition"
          >
            My Profile
          </button>
        </div>


      </div>
    </>
  );




}




