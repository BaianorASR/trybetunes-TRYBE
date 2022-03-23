import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/index.routes';
import UserContextProvider from './shared/context';

const App: React.FC = (): JSX.Element => {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </UserContextProvider>
  );
};

export default App;
