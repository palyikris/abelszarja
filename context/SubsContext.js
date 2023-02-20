import { createContext } from "react";
import { useContext } from "react";

export const SubsContext = createContext({
  haveSeen: false,
  mySubsLength: 0,
  toggleHaveSeen: function (haveSeen) {},
  alterSubsLength: function (subsLength) {}
});

export const useSubsContext = () => useContext(SubsContext);

export const SubsNotificationProvider = ({ children }) => {
  const [haveSeen, setHaveSeen] = useState(false);
  const [mySubsLength, setMySubsLength] = useState(0);

  function toggleHaveSeenHandler(haveSeen) {
    setHaveSeen(haveSeen);
  }

  function alterSubsLengthHandler(subsLength) {
    setMySubsLength(subsLength);
  }

  return (
    <SubsContext.Provider
      value={{ haveSeen, setHaveSeen, mySubsLength, setMySubsLength }}
    >
      {children}
    </SubsContext.Provider>
  );
};
