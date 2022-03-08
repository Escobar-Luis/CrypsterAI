import { createContext, useState, useContext,useEffect } from "react";
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
//   track what token is being displayed to user
  const [shown, setshown] = useState(first ? first : null);
//   store Backtest Optimization results
  const [results, setResults] = useState(null);
//   store candle close data for chart display
  const [c, setc] = useState(null);
//   track what option the user is seeing
  const [seen, setSeen] = useState("market");
    /**------------------------------------------------------------------------
   *                         Get All Coin Data From API
   *------------------------------------------------------------------------**/
  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
    )
      .then((r) => r.json())
      .then((d) => {
        setCryptoData(d);
      })
      .catch((e) => console.log(e));
  }, []);
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
      .filter((matchingCoin) => matchingCoin);
 
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
   },
 });

 function handleAdd() {
   if (
     user?.tokenSet.filter((c) => {
       return shown ? c.name === shown.id : null;
     }).length > 0
   ) {
     return alert("Coin already in Portfolio");
   }
   createToken({
     variables: {
       name: shown.id,
       userId: user.pk,
     },
   });
   refetch();
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
    refetch();
    setshown(userPortfolio? userPortfolio[0]: null);
  }
  let contextData = {
      userPortfolio:userPortfolio,
        handleAdd:handleAdd,
        handleDelete:handleDelete,
  };



  return (
    <DashboardContext.Provider value={contextData}>{children}</DashboardContext.Provider>
  );
};
