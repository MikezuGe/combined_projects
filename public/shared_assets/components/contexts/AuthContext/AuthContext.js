import React, { useState, createContext, } from 'react';
import PropTypes from 'prop-types';
import { verify, } from 'jsonwebtoken';

import { setAuthorization, } from '../../callGraphQL/callGraphQL';


const AuthContext = createContext();


const initialAuth = {
  token: '',
  isLogged: false,
  email: '',
  username: '',
};


const AuthProvider = ({ children, }) => {
  const [ auth, _setAuth, ] = useState(initialAuth);

  /**
   * 
   * @function
   * @param {Object} userInfo
   * @param {string} userInfo.token - Token received from server
   * @param {string} userInfo.username - Logged user username
   * @param {string} userInfo.email - Logged user email
   * 
   */
  const setAuth = token => {
    // handle auth, get username and email from token
    console.log('setting');
    try {
      const auth = verify(token, JWT_SECRET);
      setAuthorization(token);
      _setAuth(prevAuth => ({
        ...prevAuth,
        token,
        email: auth.email,
        username: auth.username,
        isLogged: true,
      }));
    } catch (err) {
      return 'Invalid login!';
    }
  };

  const unsetAuth = () => _setAuth(initialAuth);

  return (
    <AuthContext.Provider value={{ user: auth, setAuth, unsetAuth, }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};


const AuthConsumer = AuthContext.Consumer;


export { AuthProvider, AuthConsumer, };
export default AuthContext;
