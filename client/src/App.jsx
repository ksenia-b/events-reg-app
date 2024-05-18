import { useState, useEffect } from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import Events from "./pages/Events";
import Layout from "./pages/Layout";
import Home from "./pages/Home";

import EventRegistration from "./pages/EventRegistration";
import EventParticipation from "./pages/EventParticipation";

import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import RequireAuth from "./auth/RequireAuth";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/events"
              element={
                <RequireAuth>
                  <Events />
                </RequireAuth>
              }
            />
            <Route
              path="/event-registration/:eventId"
              element={<EventRegistration />}
            />
            <Route
              path="/event-participations/:eventId"
              element={<EventParticipation />}
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
