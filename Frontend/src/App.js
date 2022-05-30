import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import "aos/dist/aos.css";
import Register from "./pages/Register/Register";
import PublicRoute from "./navigation/PublicRoute";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import { AuthProvider } from "./context/AuthContext";
import { OptionsProvider } from "./context/OptionsContext";
import { DashboardProvider } from "./context/DashboardContext";
import { OptimizationProvider } from "./context/OptimizationContext";
import PrivateRoute from "./navigation/PrivateRoute";
// import { Steps, Hints } from "intro.js-react";

import "intro.js/introjs.css"


function App() {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
  
  return (
    // <div className=" App bg-gradient-to-r from-slate-800 via-purple-800 to-slate-800 h-screen">
    <div className=" App font-whole  ">
      <AuthProvider>
        <OptionsProvider>
          <DashboardProvider>
            <OptimizationProvider>
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicRoute />}>
              <Route path="/" element={<Landing />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
              </Route>
            {/* Private Routes */}
              <Route element={<PrivateRoute />}>
                <Route path="home" element={<Home />} />
              </Route>
              {/* 404 page not found will redirect to Home Screen */}
            </Routes>
            </OptimizationProvider>
          </DashboardProvider>
        </OptionsProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
