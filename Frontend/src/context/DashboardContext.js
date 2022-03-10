import { createContext, useState, useContext, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate, Navigate } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import AuthContext from "../context/AuthContext";

const DashboardContext = createContext();

export default DashboardContext;

export const DashboardProvider = ({ children }) => {
  /**------------------------------------------------------------------------
   *                         User Info from AuthContext
   *------------------------------------------------------------------------**/
  let { user, refetch, first, setIsLogged } = useContext(AuthContext);
  /**------------------------------------------------------------------------
   *                         Dashboard only states
   *------------------------------------------------------------------------**/
  // store all coins
  const [cryptoData, setCryptoData] = useState(null);
 
  //   const [shown, setshown] = useState(first ? first : null);
  //   store Backtest Optimization results
  const [results, setResults] = useState(null);
  //   store candle close data for chart display
  const [c, setc] = useState(null);
  //   track what option the user is seeing
  const [seen, setSeen] = useState("market");
  function handleNavSeen(e) {
    setSeen(e.target.innerText.toLowerCase());
  }
  //   track if portal to see all available tokens is open
  const [openDash, setOpenDash] = useState(false);


  const [shown, setshown] = useState(null);
  /**------------------------------------------------------------------------
   *                         User Portfolio
   *------------------------------------------------------------------------**/
  let userC = user?.tokenSet;
  let userPortfolio = userC
    ?.map((x) => {
      let matchingCoin = cryptoData?.find((c) => c.id === x.name);
      if (matchingCoin) {
        return matchingCoin;
      }
    })
    .filter((matchingCoin) => matchingCoin)

    //   track what token is being displayed to user
  
    
    let inPort = userC?.filter((c) => shown?.id === c?.name).length;
  /**------------------------------------------------------------------------
   *                         Add Token To Portfolio
   *------------------------------------------------------------------------**/
  const CREATE_TOKEN = gql`
    mutation token($name: String!, $userId: Int!) {
      createToken(name: $name, userId: $userId) {
        token
      }
    }
  `;
  const [createToken, {}] = useMutation(CREATE_TOKEN, {
    update: (proxy, mutationResult) => {
      console.log(mutationResult);
      refetch()
    },
  });

  function handleAdd() {
    // if (
    //   user?.tokenSet.filter((c) => {
    //     return shown ? c.name === shown.id : null;
    //   })
    // ) {
    //   return alert("Coin already in Portfolio");
    // }
    createToken({
      variables: {
        name: shown.id,
        userId: user.pk,
      },
    });
    ;
  }
  /**------------------------------------------------------------------------
   *                         Delete Token From Portfolio
   *------------------------------------------------------------------------**/
  const DELETE_TOKEN = gql`
    mutation delete($id: Int!) {
      deleteToken(id: $id) {
        ok
      }
    }
  `;

  const [deleteToken, { data }] = useMutation(DELETE_TOKEN, {
    update: (proxy, mutationResult) => {
      refetch()
      setshown(null)
      setResults(null);
      setc(null);
      setSeen("sentiment");
      console.log(mutationResult);
    },
  });

  function handleDelete() {
    const token = userC?.filter((c) => c.name === shown.id);
    console.log(token);
    if (!token) {
      return alert("Make an Account");
    }
    if (token.length === 0) {
      return alert("Not in portfolio");
    }

    deleteToken({
      variables: {
        id: token[0].id,
      },
    });
    ;
    ;
  }
  let contextData = {
    userPortfolio: userPortfolio,
    handleAdd: handleAdd,
    handleDelete: handleDelete,
    shown: shown,
    setshown,
    setshown,
    setSeen: setSeen,
    handleNavSeen: handleNavSeen,
    seen: seen,
    setSeen: setSeen,
    openDash: openDash,
    setOpenDash: setOpenDash,
    inPort: inPort,
    setCryptoData:setCryptoData,
    cryptoData:cryptoData
  };

  return (
    <DashboardContext.Provider value={contextData}>
      {children}
    </DashboardContext.Provider>
  );
};
