import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import { getUser, updateUser } from '../../shared/services';
import { Header, Loading } from '../../shared/components';
import { UserContext } from '../../shared/context';

const SLabel = styled.label``;
const SEditProfileContainer = styled.div`
  display: flex;
  background-color: var(--white1);
  height: 100vh;
  width: 100vw;
  flex-direction: column;
  padding: 1rem;
  align-items: center;

  h1 {
    color: var(--blue);
    text-transform: uppercase;
  }

  & form {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
    align-items: center;

    & .input-control {
      position: relative;
      height: 3rem;
      width: 300px;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);

      & ${SLabel} {
        color: var(--dark);
        position: absolute;
        font-weight: 300;
        font-size: 1.1rem;
        left: 1rem;
        bottom: 0.5rem;
        margin: auto;
        transition: transform 0.3s ease;
      }

      & input {
        color: var(--dark);
        height: 100%;
        font-size: 1rem;
        width: 100%;
        padding: 1rem 0.6rem 0;
        background-color: var(--bege);
        border-bottom: 2px solid var(--grey3);

        &:focus ~ ${SLabel}, &:valid ~ ${SLabel} {
          color: var(--blue);
          font-weight: 600;
          transform: translateX(-8px) translateY(-18px) scale(0.9);
          transition: transform 0.3s ease;
        }
      }

      // tira a alteração da cor do fundo ao clicar em uma opção do auto complete
      // https://pt.stackoverflow.com/questions/256541/alterar-o-background-do-input-preenchido-pelo-autocomplete-do-chrome
      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus,
      textarea:-webkit-autofill,
      textarea:-webkit-autofill:hover textarea:-webkit-autofill:focus,
      select:-webkit-autofill,
      select:-webkit-autofill:hover,
      select:-webkit-autofill:focus {
        -webkit-text-fill-color: var(--dark) !important;
        box-shadow: 0 0 0 2rem var(--bege) inset;
        transition: background-color 1s ease-in-out 0s;
      }
    }

    & button {
      font-size: 1rem;
      padding: 0.6rem;
      background-color: var(--green);
      color: var(--dark);
      font-weight: 500;
      border-radius: 0.2rem;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);

      &:disabled {
        background-color: var(--red);
        color: var(--white1);
      }
    }
  }
`;

interface IUser {
  description: string;
  email: string;
  image: string;
  name: string;
}

interface IProfileEditProps extends RouteComponentProps {}

export const ProfileEdit: React.FC<IProfileEditProps> = ({ history: { push } }) => {
  const [hasDisabledButton, setHasDisabledButton] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<IUser>();
  const USER_CONTEXT = useContext(UserContext);

  useEffect(() => {
    const abortController = new AbortController();
    getUser().then((data) => {
      setUser(data);
      setLoading(false);
    });
    return (): void => abortController.abort();
  }, []);

  const handleButtonValidation = () => {
    // regex regex alterado para o requisito https://regexr.com/3e48o
    const regex = /^[\w\\.]+@([\w]+\.)+com$/g;
    return user
      ? !(Object.values(user).every((each) => each) && regex.test(user.email))
      : false;
  };

  const handleInputChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setUser(user && { ...user, [name]: value });
    setHasDisabledButton(handleButtonValidation());
  };

  const handleSaveButton = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);
    await updateUser(user);
    USER_CONTEXT.setUser(user);
    push('/profile');
  };

  return (
    <>
      {loading && <Loading />}
      <Header />
      {user && (
        <SEditProfileContainer data-testid="page-profile-edit">
          <h1>Editar perfil</h1>
          <form>
            <div className="input-control">
              <input
                required
                minLength={3}
                autoComplete="off"
                name="name"
                value={user.name}
                onInput={handleInputChange}
                data-testid="edit-input-name"
                type="text"
                id="name"
              />
              <SLabel htmlFor="name">Nome</SLabel>
            </div>
            <div className="input-control">
              <input
                required
                minLength={3}
                autoComplete="off"
                name="email"
                value={user.email}
                onInput={handleInputChange}
                data-testid="edit-input-email"
                type="text"
                id="email"
              />
              <SLabel htmlFor="email">Email</SLabel>
            </div>
            <div className="input-control">
              <input
                required
                minLength={10}
                autoComplete="off"
                name="description"
                value={user.description}
                onInput={handleInputChange}
                data-testid="edit-input-description"
                type="text"
                id="description"
              />
              <SLabel htmlFor="description">Descrição</SLabel>
            </div>
            <div className="input-control">
              <input
                required
                minLength={5}
                autoComplete="off"
                name="image"
                value={user.image}
                onInput={handleInputChange}
                data-testid="edit-input-image"
                type="text"
                id="image"
              />
              <SLabel htmlFor="image">Image</SLabel>
            </div>
            <button
              disabled={hasDisabledButton}
              onClick={handleSaveButton}
              type="submit"
              data-testid="edit-button-save">
              Salvar
            </button>
          </form>
        </SEditProfileContainer>
      )}
    </>
  );
};
