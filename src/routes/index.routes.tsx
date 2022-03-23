import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Album,
  Favorites,
  Login,
  NotFound,
  Profile,
  ProfileEdit,
  Search,
} from '../pages';

const AppRoutes: React.FC = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/album/:id" component={Album} />
      <Route exact path="/favorites" component={Favorites} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/profile/edit" component={ProfileEdit} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default AppRoutes;
