import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { createUser } from '../../shared/services';
import { Loading } from '../../shared/components';
import Form from './components/Form';

interface LoginProps extends RouteComponentProps<{}> {}

const SLogin = styled.div`
  align-items: center;
  background-color: var(--white2);
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;

  hr {
    color: var(--dark);
    height: 300px;
    margin: 0 2rem;
  }

  header {
    color: var(--blue);
    font-size: 4rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    justify-content: center;

    & header {
      font-size: 3rem;
    }
    hr {
      display: none;
    }
  }
`;

export const Login: React.FC<LoginProps> = ({ history }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [value, setValue] = useState<string>('');

  const handleChangeInput = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    const MIN_CARACTERES = 3;
    setValue(target.value);
    setIsDisabled(target.value.length < MIN_CARACTERES);
  };

  const handleClickButton = (name: string): void => {
    setLoading(true);
    createUser({ name }).then(() => {
      setLoading(false);
      history.push('/search');
    });
  };

  return loading ? (
    <Loading />
  ) : (
    <SLogin data-testid="page-login">
      <header>
        <h1>BaiTune</h1>
      </header>
      <hr />
      <Form
        value={value}
        isDisabled={isDisabled}
        onClick={handleClickButton}
        onChange={handleChangeInput}
      />
    </SLogin>
  );
};
