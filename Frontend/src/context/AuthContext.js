import { createContext, useState, useMemo } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate, Navigate } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  // State of userData
  const [userData, setUserData] = useState(null);
  // Getting User Access Tokens
  const [accessToken, setAccessToken] = useState(() =>
    sessionStorage.getItem("accessToken")
      ? sessionStorage.getItem("accessToken")
      : null
  );
  const[first, setfirst]= useState(null)
  // Decode the access Token so I can get username as a workaround for not being able to get his pk
  const user = sessionStorage.getItem("accessToken")
    ? jwt_decode(sessionStorage.getItem("accessToken")).username
    : null;

  // This query gets the users information and saves it to the cache
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
  const {data, refetch } = useQuery(GET_USER, {
    variables: { username: user },
  });

function handlefirst(c){
  setfirst(c)
}
const[openUno, setOpenUno]=useState(false)
const[openDos, setOpenDos]=useState(false)
 
  let contextData = {
    user: data?.users?.edges[0]?.node? data.users.edges[0].node: null,
    refetch:refetch,
    handlefirst: handlefirst,
    first: first,

  };



  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
