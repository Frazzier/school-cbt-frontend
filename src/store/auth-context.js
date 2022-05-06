import React, { useState } from "react";

const AuthContext = React.createContext({
  user: {},
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  return storedToken;
};

const retrieveStoredUser = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  return storedUser;
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  const userData = retrieveStoredUser();

  let initialToken;
  if (tokenData) {
    initialToken = tokenData;
  }

  let initialUser = {};
  if (userData) {
    initialUser = userData;
  }

  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(initialUser);

  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const loginHandler = (token, user) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const updateProfileHandler = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const contextValue = {
    user: user,
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    updateProfile: updateProfileHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
