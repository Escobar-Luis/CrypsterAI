import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import "aos/dist/aos.css";
import Register from "./pages/Register";
import PublicRoute from "./utils/PublicRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import { OptionsProvider } from "./context/OptionsContext";
import { DashboardProvider } from "./context/DashboardContext";
import PrivateRoute from "./utils/PrivateRoute";

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
            <Routes>
              <Route path="/" element={<Home />} />
              <Route element={<PublicRoute />}>
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="dashboard" element={<Dashboard />} />
              </Route>
            </Routes>
          </DashboardProvider>
        </OptionsProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
