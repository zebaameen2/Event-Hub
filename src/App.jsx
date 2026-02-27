
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import CreateEventPage from "./pages/CreateEventPage";
import EventDetails from "./pages/EventDetails";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import EventsList from "./pages/EventsList.jsx";
import SuccessReg from "./pages/SuccessReg.jsx";
import SignUp from "./pages/Signup.jsx";
import MyEvents from "./pages/MyEvents";
import EventStats from "./pages/EventStats";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import MyProfile from "./pages/MyProfile.jsx"
import DashBoardContent from "./pages/DashBoardContent.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <><Header /><CreateEventPage /></>
              </ProtectedRoute>
            }
          />
          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <><Header /><EventsList /></>
              </ProtectedRoute>
            }
          />
          <Route
            path="/events/:eventId"
            element={
              <ProtectedRoute>
                <><Header /><EventDetails /></>
              </ProtectedRoute>
            }
          />
          <Route
            path="/events/successreg"
            element={
              <ProtectedRoute>
                <><Header /><SuccessReg /></>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <><Header /><DashBoardContent/> </>
              </ProtectedRoute>
            }
          />
          

          <Route
            path="/events/:id/stats"
            element={
              <ProtectedRoute>
                <><Header /><EventStats /></>
              </ProtectedRoute>
            }
          />
          <Route
            path="/myevents"
            element={
              <ProtectedRoute>
                <><Header /><MyEvents /></>
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={<ProtectedRoute>
              <><Header /><MyProfile /></>
            </ProtectedRoute>} />

          <Route
            path="/stats/:event"
            element={
              <ProtectedRoute>
                <><Header /><EventStats /></>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
