import React, { createContext, useState } from 'react';

interface IUserContextProvider {
  children: React.ReactNode;
}

interface IUser {
  description: string;
  email: string;
  image: string;
  name: string;
}

interface IUserContext {
  user: IUser | undefined;
  setUser: (arg: any) => void;
}

export const UserContext = createContext<IUserContext>({
  user: undefined,
  setUser: (arg) => {
    console.log(arg);
  },
});

const UserContextProvider: React.FC<IUserContextProvider> = ({ children }) => {
  const [userData, setUserData] = useState<IUser>();

  return (
    <UserContext.Provider
      value={{
        user: userData,
        setUser: setUserData,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
