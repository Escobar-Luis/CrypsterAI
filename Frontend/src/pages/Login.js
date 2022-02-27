import React, { useState } from "react";
import pic from "../images/jeremy-bezanger-8zBi9ktYaX8-unsplash-removebg-preview.png";
import { Link } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
function Login({ setUser }) {
  const [formData, updateFormData] = useState({ username: "", password: "" });

  function handleChange(e) {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  }

  const history = useNavigate();
  const LOG_IN = gql`
    mutation tokenAuth($username: String!, $password: String!) {
      tokenAuth(username: $username, password: $password) {
        success
        errors
        token
        refreshToken
        user {
          username
          pk
          id
          email
        }
      }
    }
  `;
  const [logIn, { loading }] = useMutation(LOG_IN, {
    update: (proxy, mutationResult) => {
      if (mutationResult.data.tokenAuth.errors) {
        for (const [key, value] of Object.entries(
          mutationResult.data.tokenAuth.errors
        )) {
          for (const [k, v] of Object.entries(value[0])) {
            alert(`${k} : ${v}`);
            return null;
          }
        }
      }
      setUser(mutationResult.data.tokenAuth.user);
      sessionStorage.setItem(
        "refreshToken",
        mutationResult.data.tokenAuth.refreshToken
      );
      sessionStorage.setItem(
        "accessToken",
        mutationResult.data.tokenAuth.token
      );
      // isLoggedInVar(true)
      history("/dashboard");
    },
  });
  function handleChange(e) {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  }

  function handleClick() {
    console.log(formData);
    logIn({
      variables: {
        username: formData.username,
        password: formData.password,
      },
    });
  }
  // function handleClick() {
  //   console.log(formData);
  // axiosInstance
  //   .post(`token/`, {
  //     email: formData.email,
  //     password: formData.password,
  //   })
  //   .then((res) =>{
  //     console.log(jwt_decode(res.data.access))
  //     localStorage.setItem('access_token',res.data.access)
  //     localStorage.setItem('refresh_token',res.data.refresh)
  //     axiosInstance.defaults.headers['Authorization'] =
  //       'JWT ' + localStorage.getItem('access_token')

  // console.log(r)
  // console.log(r.data)

  // }
  // if (sessionStorage.getItem("accessToken") !== null) {
  //   return <Navigate to="protected/dashboard" />;
  // }
  return (
    <div className="bg-gradient-to-r from-slate-800 via-purple-800 to-slate-800 overflow-x-hidden lg:overflow-x-auto lg:overflow-hidden flex items-center justify-center h-screen lg:h-screen ">
      {/* this contains the group state */}
      <div className="container w-full lg:w-4/5  lg:bg-slate-300  lg:h-screen-75 lg:border border-gray-300 rounded-lg flex flex-wrap lg:flex-nowrap flex-col lg:flex-row justify-between group">
        {/* /**========================================================================
         *                           SECTION Product Side
         *========================================================================** */}
        <div className="w-full lg:w-1/2  lg:h-full mt-32 lg:mt-0 lg:bg-purple-600 flex relative order-2 lg:order-1">
          <div className="text-center  hidden lg:flex items-center justify-start h-full w-full select-none">
            <span className="transform block whitespace-nowrap h-full -rotate-90 text-[40px] 2xl:text-[48px] font-black uppercase text-yellow-400 opacity-0 transition-all group-hover:opacity-100 ml-10 2xl:ml-12 group-hover:-ml-20 2xl:group-hover:ml-26 lg:group-hover:ml-20 duration-1000 lg:duration-700 ease-in-out">
              SELECT-BACKTEST-IMPLEMENT
            </span>
          </div>
          <div className="product absolute  md:right-0 -bottom-20 md:bottom-0 flex items-center lg:justify-center w-full opacity-50 lg:opacity-100">
            <img
              src={pic}
              alt="product"
              className="lg:mb-5  lg:ml-0 product  h-[700px]  2xl:h-[800px] w-auto object-cover transform group-hover:translate-x-32 2xl:group-hover:translate-x-48 transition-all duration-1000 lg:duration-700 ease-in-out"
            />
            {/* <!-- product image --> */}

            <div className="shadow w-1/2 h-5 bg-black bg-opacity-25 filter blur absolute bottom-0 lg:bottom-14 left-0 lg:left-56 rounded-full transform skew-x-10"></div>
            {/* <!-- product shadow --> */}
          </div>

          <div className="hidden lg:block w-1/3 bg-white ml-auto"></div>
        </div>
        {/* <!-- Product Side End--> */}

        {/* <!-- Login Form --> */}
        <div className="w-full lg:w-1/2 order-1 lg:order-2 text-white lg:text-gray-700">
          <div className="form-wrapper flex items-center lg:h-full px-10 relative z-10 pt-16 lg:pt-0">
            <div className="w-full space-y-5">
              <div className="form-caption flex items-end justify-center text-center space-x-3 mb-0">
                <span className="text-3xl font-semibold ">Log In</span>
                <span className="text-base text-gray-800"></span>
              </div>
              {/* <!-- form caption --> */}

              <div className="form-element">
                <label className="space-y-2 w-full lg:w-4/5 block mx-auto">
                  <span className="block text-lg  tracking-wide">Username</span>
                  <span className="block">
                    <input
                      name="username"
                      onChange={handleChange}
                      type="text"
                      className="bg-yellow-100 lg:bg-white border lg:border-2 border-gray-400 lg:border-gray-200 w-full p-3 focus:outline-none active:outline-none focus:border-gray-400 active:border-gray-400"
                    />
                  </span>
                </label>
              </div>
              {/* <!-- form element --> */}

              <div className="form-element">
                <label className="space-y-2 w-full lg:w-4/5 block mx-auto">
                  <span className="block text-lg  tracking-wide">Password</span>
                  <span className="block">
                    <input
                      name="password"
                      onChange={handleChange}
                      type="password"
                      className="bg-yellow-100 lg:bg-white border lg:border-2 border-gray-400 lg:border-gray-200 w-full p-3 focus:outline-none active:outline-none focus:border-gray-400 active:border-gray-400"
                    />
                  </span>
                </label>
              </div>

              {/* <!-- form element --> */}

              <div className="form-element">
                <div className="w-full lg:w-4/5 block mx-auto flex items-center justify-between">
                  <label className="block  tracking-wide flex items-center space-x-2 select-none">
                    <input type="checkbox" name="" id="" />
                    <span className="block  tracking-wide">Remember me</span>
                  </label>
                  {/* <Link className=" text-gray-800 tracking-wide inline-block border-b border-gray-300 hover:text-purple-500" to='/'>Forgot Password?</Link> */}
                </div>
              </div>
              {/* <!-- form element --> */}

              <div className="form-element">
                <span className="w-full lg:w-4/5 block mx-auto ">
                  <input
                    onClick={handleClick}
                    type="submit"
                    className="cursor-pointer border-2 rounded-full text-black border-yellow-300 w-full p-3 bg-yellow-300 focus:outline-none active:outline-none focus:bg-theme-yellow active:bg-theme-yellow hover:bg-theme-yellow transition-all"
                  />
                </span>
              </div>
              <Link
                className=" tracking-wide flex justify-center border-b border-gray-300 hover:text-purple-500"
                to="/register"
              >
                Don't have an account?
              </Link>
              <Link
                className=" tracking-wide  flex justify-center border-b border-gray-300 hover:text-purple-500"
                to="/cryptos"
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
