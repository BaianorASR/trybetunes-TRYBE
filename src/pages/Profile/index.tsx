import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import { getUser } from '../../shared/services';
import { Header, Loading } from '../../shared/components';

const SProfileContainer = styled.section`
  align-items: flex-start;
  background-color: var(--white3);
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  border-radius: 0.2rem;
  color: var(--dark);
  display: flex;
  flex-direction: column;
  height: 500px;
  justify-content: space-evenly;
  margin: auto;
  padding: 1rem;
  position: relative;
  width: 350px;

  & .top-side {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0 auto;

    img {
      clip-path: circle(50% at 50% 50%);
      height: 125px;
      object-fit: cover;
      width: 125px;
    }

    button {
      background-color: var(--bege);
      border-radius: 1px;
      color: var(--dark);
      font-weight: 500;
      padding: 0.5rem;
      width: fit-content;

      &:hover,
      &:active {
        background-color: var(--orange);
        box-shadow: 0 0 1rem var(--orange);
      }
    }
  }

  & .bot-side {
    & h5 {
      margin-top: 0.6rem;
    }

    & div:nth-last-child(1) p {
      min-height: 7rem;
    }

    & p {
      background-color: var(--light-blue);
      border-radius: 0.2rem;
      border-bottom: 2px solid var(--rose);
      font-weight: 300;
      padding: 0.5rem;
      width: 315px;
    }
  }
`;

interface IUser {
  description: string;
  email: string;
  image: string;
  name: string;
}

interface IProfileProps extends RouteComponentProps<{}> {}

export const Profile: React.FC<IProfileProps> = ({ history: { push } }) => {
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const abortController = new AbortController();
    getUser().then((data) => {
      setUser(data);
      setLoading(false);
    });
    return () => abortController.abort();
  }, []);

  const handleProfileEdit = () => {
    console.log();
    push('/profile/edit');
  };

  return (
    <>
      <Header />
      {loading && <Loading />}
      {user && (
        <>
          <h1
            style={{
              textAlign: 'center',
              padding: '1rem',
              color: 'var(--dark)',
            }}>
            Perfil
          </h1>
          <SProfileContainer data-testid="page-profile">
            <div className="top-side">
              <img
                data-testid="profile-image"
                src={
                  user.image ||
                  'http://wtech.ind.br/wp-content/uploads/2017/01/default-avatar-500x500.jpg'
                }
                alt="profile pic"
              />
              <button type="button" onClick={handleProfileEdit}>
                Editar perfil
              </button>
            </div>
            <div className="bot-side">
              <div>
                <h5>Usuário</h5>
                <p>{user.name}</p>
              </div>
              <div>
                <h5>Email</h5>
                <p>{user.email || 'Edite se perfil para adicionar o email'}</p>
              </div>
              <div>
                <h5>Descrição</h5>
                <p>
                  {user.description || 'Edite se perfil para adicionar uma descrição'}
                </p>
              </div>
            </div>
          </SProfileContainer>
        </>
      )}
    </>
  );
};
