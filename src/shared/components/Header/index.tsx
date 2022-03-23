import React, { useState, useEffect, memo, useContext } from 'react';
import styled from 'styled-components';
import { FaHeadphonesAlt } from 'react-icons/fa';
import Loading from '../Loading';
import Navbar from './components/Navbar';
import { getUser } from '../../services/userAPI';
import { UserContext } from '../../context';

const SIconPhone = styled(FaHeadphonesAlt)`
  margin-left: 5px;
  font-size: 2.5rem;
  color: var(--green);
  position: absolute;
  top: -5px;
  left: 40px;
  transform: rotate(20deg);
`;

const SHeader = styled.header`
  background-color: var(--dark);
  color: var(--white2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 6rem;

  & h2 {
    margin-left: 1rem;
    position: relative;
    color: var(--bege);
    p {
      color: var(--white3);
    }
  }
`;

const SUserInfo = styled.section`
  padding: 0.5rem;
  height: 100%;
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    margin-bottom: 5px;
    font-size: 1.1rem;
    letter-spacing: 1px;
    font-weight: 500;
  }
  img {
    width: 50px;
    clip-path: circle(50% at 50% 50%);
    object-fit: cover;
  }
`;

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const USER_CONTEXT = useContext(UserContext);

  useEffect(() => {
    const abortController = new AbortController();
    if (!USER_CONTEXT.user) {
      setLoading(true);
      getUser().then((data) => {
        USER_CONTEXT.setUser(data);
        setLoading(false);
      });
    }
    return () => abortController.abort();
  }, [USER_CONTEXT]);

  return (
    <div style={{ backgroundColor: 'var(--dark)' }}>
      {loading && <Loading />}
      <SHeader data-testid="header-component">
        <h2>
          <p>Bai</p>
          Tunes
          <SIconPhone />
        </h2>
        <SUserInfo>
          <p data-testid="header-user-name">{USER_CONTEXT.user?.name.split(' ')[0]}</p>
          <img
            src={
              USER_CONTEXT.user?.image ||
              'http://wtech.ind.br/wp-content/uploads/2017/01/default-avatar-500x500.jpg'
            }
            alt=""
          />
        </SUserInfo>
      </SHeader>
      <Navbar />
    </div>
  );
};

export default memo(Header);
