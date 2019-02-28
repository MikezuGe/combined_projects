import React, { useState, createContext, } from 'react';


const AuthContext = createContext();


const AuthProvider = ({ children, }) => {
  const [ auth, _setAuth, ] = useState({
    token: '',
    isLogged: false,
    email: '',
    username: '',
  });

  const setAuth = token => {
    // handle auth, get username and email from token
    _setAuth(prevAuth => ({
      ...prevAuth,
      isLogged: true,
      token,
      //email,
      //username,
    }));
  }

  return (
    <AuthContext.Provider value={{ ...auth, setAuth, }}>
      {children}
    </AuthContext.Provider>
  );
}


const AuthConsumer = AuthContext.Consumer;


export { AuthProvider, AuthConsumer, };
export default AuthContext;
