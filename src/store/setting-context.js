import React, { useState } from "react";

const SettingContext = React.createContext({
  logo: "",
  appName: "",
  setSetting: (setting) => {},
});

export const SettingContextProvider = (props) => {
  const [logo, setLogo] = useState({});
  const [appName, setAppName] = useState({});

  const setSettingHandler = (setting) => {
    setLogo(setting.logo);
    setAppName(setting.app_name);
  };

  const contextValue = {
    logo,
    appName,
    setSetting: setSettingHandler,
  };

  return (
    <SettingContext.Provider value={contextValue}>
      {props.children}
    </SettingContext.Provider>
  );
};

export default SettingContext;
