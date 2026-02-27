


import { Link, useNavigate } from "react-router-dom";

export default function Header({eventId}) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <div className="h-screen w-64 bg-white shadow-lg flex flex-col justify-between fixed left-0 top-0">

      {/* TOP LOGO */}
      <div>
        <Link to="/landing" className="flex justify-center py-6 border-b">
          <img
            src="/logo/logo-transparent-svg.png"
            alt="Product Logo"
            className="h-20 w-34"
          />
        </Link>

        {/* NAV LINKS */}
        <nav className="flex flex-col p-6 gap-5 text-gray-600 font-medium">

          <Link className="mr-5 hover:text-gray-900 text-gray-500" to="/dashboard">
            Home
          </Link>

          <Link
            className="hover:text-pink-600 transition"
            to="/myevents"
          >
            My Events
          </Link>

          <Link
            className="hover:text-pink-600 transition"
            to="/events"
          >
            Find Events
          </Link>

          <Link
            className="hover:text-pink-600 transition"
            to="/create"
          >
            Create Event
          </Link>

            {eventId && (
        <Link to={`/events/${eventId}/stats`} className="bg-blue-600 text-white px-4 py-2 rounded" >
          View Stats
        </Link> )}

         
        </nav>
      </div>

      {/* SIGN OUT BOTTOM */}
      <div className="p-6 border-t">
        <button
          onClick={handleSignOut}
          className="w-full bg-[#f02e65] hover:bg-[#ab073d] text-white py-2 rounded-full"
        >
          Sign Out
        </button>
      </div>

    </div>
  );
}


