import React, { memo } from 'react';
import styled from 'styled-components';
import { Link, useRouteMatch } from 'react-router-dom';

const SLink = styled(Link)`
  background-color: var(
    ${(props) => (props.itemProp === props.to ? '--white3' : '--grey1')}
  );
  color: var(${(props) => (props.itemProp === props.to ? '--dark' : '--white1')});
  text-transform: uppercase;
  cursor: pointer;
  flex-grow: 1;
  font-size: 16px;
  padding: 8px;
  text-align: center;
  text-decoration: none;

  &:hover {
    background-color: var(--grey3);
  }
`;
const SNav = styled.nav`
  background-color: var(--grey1);
  display: flex;
  justify-content: space-around;
`;

const Navbar: React.FC = (): JSX.Element => {
  const routeMatch = useRouteMatch();

  return (
    <SNav className="links">
      <SLink to="/search" data-testid="link-to-search" itemProp={routeMatch.path}>
        Search
      </SLink>
      <SLink to="/favorites" data-testid="link-to-favorites" itemProp={routeMatch.path}>
        favorites
      </SLink>
      <SLink to="/profile" data-testid="link-to-profile" itemProp={routeMatch.path}>
        profile
      </SLink>
    </SNav>
  );
};

export default memo(Navbar);
