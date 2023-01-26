import {createContext, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = (props: any) => {
  const [authUser, setAuthUser] = useState(null);
  return (
    <AuthContext.Provider value={{authUser, setAuthUser}}>
      {props.children}
    </AuthContext.Provider>
  );
};
