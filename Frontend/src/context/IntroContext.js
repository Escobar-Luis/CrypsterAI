import { createContext, useState, useMemo } from "react";

const IntroContext = createContext();

export default IntroContext;

export const IntroProvider = ({ children }) => {
  const [stepsEnabled, setStepsEnabled] = useState(false);
  const [initialStep, setInitialStep] = useState(0);
  const [steps, setSteps] = useState([
    {
      intro: "Welcome to our application",
      position: "top",
    },
    {
      element: document.getElementById(".card"),
      intro: "This is the second step",
      position: "left",
    },
    {
      element: document.querySelector(".tableRow"),
      intro: "This is the third step",
      position: "top",
    },
  ]);
  const onExit = () => {
    setStepsEnabled(false);
  };
  const startIntro = () => {
    setStepsEnabled(true);
  };
  let contextData = {
    options: options,
  };

  return (
    <IntroContext.Provider value={contextData}>
      {children}
    </IntroContext.Provider>
  );
};
