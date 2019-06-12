import React, { useState, createContext, } from 'react';
import PropTypes from 'prop-types';


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
      isLogged: !!token,
      token: token || '',
      //email,
      //username,
    }));
  }

  return (
    <AuthContext.Provider value={{ ...auth, setAuth, }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};


export { AuthProvider, };
export default AuthContext;
