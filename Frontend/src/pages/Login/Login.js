import React, { useContext, useState } from "react";
import pic from "../../assets/jeremy-bezanger-8zBi9ktYaX8-unsplash-removebg-preview.png";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function Login() {
  const [formData, updateFormData] = useState({ username: "", password: "" });
  let { setIsLogged, logIn } = useContext(AuthContext);
  function handleChange(e) {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  }

  function handleClick() {
    logIn({
      variables: {
        username: formData.username,
        password: formData.password,
      },
    });
  }

  return (
    <div className="flex h-screen items-center justify-center overflow-x-hidden bg-gradient-to-r from-slate-800 via-purple-800 to-slate-800 lg:h-screen lg:overflow-hidden lg:overflow-x-auto ">
      <div className="container group flex  w-full  flex-col flex-wrap justify-between rounded-lg border-gray-300 lg:h-screen-75 lg:w-4/5 lg:flex-row lg:flex-nowrap lg:border lg:bg-slate-300">
        {/* /**========================åå================================================
         *                           SECTION Product Side
         *========================================================================** */}
        <div className="relative order-2  mt-32 flex w-full lg:order-1 lg:mt-0 lg:h-full lg:w-1/2 lg:bg-purple-600">
          <div className="hidden  h-full w-full select-none items-center justify-start text-center lg:flex">
            <span className="2xl:group-hover:ml-26 ml-10 block h-full -rotate-90 transform whitespace-nowrap text-[40px] font-black uppercase text-yellow-400 opacity-0 transition-all duration-1000 ease-in-out group-hover:-ml-20 group-hover:opacity-100 lg:duration-700 lg:group-hover:ml-20 2xl:ml-12 2xl:text-[48px]">
              SELECT-BACKTEST-IMPLEMENT
            </span>
          </div>
          <div className="product absolute  -bottom-20 flex w-full items-center opacity-50 md:right-0 md:bottom-0 lg:justify-center lg:opacity-100">
            <img
              src={pic}
              alt="product"
              className="product  h-[700px] w-auto  transform  object-cover transition-all duration-1000 ease-in-out group-hover:translate-x-32 lg:mb-5 lg:ml-0 lg:duration-700 2xl:h-[800px] 2xl:group-hover:translate-x-48"
            />
            {/* <!-- product image --> */}

            <div className="skew-x-10 absolute bottom-0 left-0 h-5 w-1/2 transform rounded-full bg-black bg-opacity-25 shadow blur filter lg:bottom-14 lg:left-56"></div>
            {/* <!-- product shadow --> */}
          </div>

          <div className="ml-auto hidden w-1/3 bg-white lg:block"></div>
        </div>
        {/* <!-- Product Side End--> */}

        {/* <!-- Login Form --> */}
        <div className="order-1 w-full text-white lg:order-2 lg:w-1/2 lg:text-gray-700">
          <div className="form-wrapper relative z-10 flex items-center px-10 pt-16 lg:h-full lg:pt-0">
            <div className="w-full space-y-5">
              <div className="form-caption mb-0 flex items-end justify-center space-x-3 text-center">
                <span className="text-3xl font-semibold ">Log In</span>
                <span className="text-base text-gray-800"></span>
              </div>
              {/* <!-- form caption --> */}

              <div className="form-element ">
                <label className="mx-auto block w-full space-y-2 lg:w-4/5">
                  <span className="block text-lg  tracking-wide">Username</span>
                  <span className="block">
                    <input
                      name="username"
                      onChange={handleChange}
                      type="text"
                      className="w-full border border-gray-400 bg-yellow-100 p-3 text-black focus:border-gray-400 focus:outline-none active:border-gray-400 active:outline-none lg:border-2 lg:border-gray-200 lg:bg-white"
                    />
                  </span>
                </label>
              </div>
              {/* <!-- form element --> */}

              <div className="form-element">
                <label className="mx-auto block w-full space-y-2 lg:w-4/5">
                  <span className="block text-lg  tracking-wide">Password</span>
                  <span className="block">
                    <input
                      name="password"
                      onChange={handleChange}
                      type="password"
                      className="w-full border border-gray-400 bg-yellow-100  p-3 text-black focus:border-gray-400 focus:outline-none active:border-gray-400 active:outline-none lg:border-2 lg:border-gray-200 lg:bg-white"
                    />
                  </span>
                </label>
              </div>

              {/* <!-- form element --> */}

              <div className="form-element">
                <div className="mx-auto block flex w-full items-center justify-between lg:w-4/5">
                  <label className="block  flex select-none items-center space-x-2 tracking-wide">
                    <input type="checkbox" name="" id="" />
                    <span className="block  tracking-wide">Remember me</span>
                  </label>
                </div>
              </div>
              {/* <!-- form element --> */}

              <div className="form-element">
                <span className="mx-auto block w-full lg:w-4/5 ">
                  <input
                    onClick={handleClick}
                    type="submit"
                    className="w-full cursor-pointer rounded-full border-2 border-yellow-300 bg-yellow-300 p-3 text-black transition-all hover:bg-theme-yellow focus:bg-theme-yellow focus:outline-none active:bg-theme-yellow active:outline-none"
                  />
                </span>
              </div>
              <Link
                className=" flex justify-center border-b border-gray-300 tracking-wide hover:text-purple-500"
                to="/register"
              >
                Don't have an account?
              </Link>
              <Link
                onClick={() => setIsLogged(true)}
                className="guest flex  justify-center border-b border-gray-300 tracking-wide hover:text-purple-500"
                to="/home"
              >
                Continue As Guest
              </Link>
              {/* <!-- form element --> */}
            </div>
          </div>
          {/* <!-- form wrapper --> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
