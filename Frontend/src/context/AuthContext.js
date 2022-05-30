import { createContext, useState, useMemo } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate, Navigate } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const history = useNavigate();
  /**------------------------------------------------------------------------
   *                         Check for USER
   *------------------------------------------------------------------------**/
  // Check if user exists if the system has an accessToken in the sessions container
  const [isLogged, setIsLogged] = useState(
    sessionStorage.getItem("accessToken") !== null ? true : false
  );
    // Decode the access Token so I can get username as a workaround for not being able to get his pk
  let user = sessionStorage.getItem("accessToken")
    ? jwt_decode(sessionStorage.getItem("accessToken")).username
    : null;
  // If we do, then we decode the token to get username and search for that user in our database to then get there details
  const GET_USER = gql`
    query User($username: String!) {
      users(username: $username) {
        edges {
          node {
            pk
            tokenSet {
              name
              id
            }
          }
        }
      }
    }
  `;
  const { data, refetch } = useQuery(GET_USER, {
    variables: { username: user },
  });

  /**------------------------------------------------------------------------
   *                         Register User
   *------------------------------------------------------------------------**/
  // User Registration

  const CREATE_USER = gql`
    mutation register(
      $email: String!
      $username: String!
      $password1: String!
      $password2: String!
    ) {
      register(
        email: $email
        username: $username
        password1: $password1
        password2: $password2
      ) {
        success
        errors
        token
        refreshToken
      }
    }
  `;

  const [createUser, {}] = useMutation(CREATE_USER, {
    update: (proxy, mutationResult) => {
      if (mutationResult.data.register.errors) {
        for (const [key, value] of Object.entries(
          mutationResult.data.register.errors
        )) {
          for (const [k, v] of Object.entries(value[0])) {
            if (
              v.includes("_") ||
              v == "unique" ||
              v === "This field is required." ||
              v === "required" ||
              v === "invalid"
            ) {
              return null;
            }
            alert(`${v}`);
          }
        }
      }
      sessionStorage.setItem(
        "refreshToken",
        mutationResult.data.register.refreshToken
      );
      sessionStorage.setItem("accessToken", mutationResult.data.register.token);
      setIsLogged(true);
      history("/home");
    },
  });
  /**------------------------------------------------------------------------
   *                         Login User
   *------------------------------------------------------------------------**/
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

      sessionStorage.setItem(
        "refreshToken",
        mutationResult.data.tokenAuth.refreshToken
      );
      sessionStorage.setItem(
        "accessToken",
        mutationResult.data.tokenAuth.token
      );
      setIsLogged(true);
      history("/home");
    },
  });
  /**------------------------------------------------------------------------
   *                         LogOut User
   *------------------------------------------------------------------------**/
   function logout() {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    setIsLogged(false);
    history("/login");
  }


  let contextData = {
    user: data?.users?.edges[0]?.node ? data.users.edges[0].node : null,
    refetch: refetch,
    isLogged: isLogged,
    setIsLogged: setIsLogged,
    createUser: createUser,
    logIn: logIn,
    logout:logout,
    name:user
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
