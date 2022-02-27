import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
function App() {
  return  (
    <div className=" App bg-gradient-to-r from-slate-800 via-purple-800 to-slate-800 h-screen">
   
        {/* <AuthProvider> */}
          <Routes>
            {/* for the route, it doesn't want a child but a child element  */}
            <Route path="/" element={<Home />} />
            {/* <Route element={<PublicRoute isLogged={isLogged} />}>
              <Route
                path="/register"
                element={<RegisterForm setUser={setUser} />}
              />
              <Route path="/login" element={<Login setUser={setUser} />} />
            </Route>
            <Route element={<PrivateRoute isLogged={isLogged} />}>
              <Route
                path="dashboard"
                element={<Dashboard setUser={setUser} user={user} />}
              />
              <Route
                path="crypto"
                element={<CryptoCardContainer user={user} />}
              />
            </Route> */}
          </Routes>
        {/* </AuthProvider> */}
    </div>
  );
}


export default App;
