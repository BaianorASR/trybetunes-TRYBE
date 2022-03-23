import React from 'react';
import styled from 'styled-components';
import { VscSearch } from 'react-icons/vsc';

const SForm = styled.form`
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
  display: flex;
  gap: 1rem;
  width: 100vw;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const SInput = styled.input`
  border: 1px solid var(--light-blue);
  border-radius: 2px;
  bottom: 0;
  color: var(--grey3);
  cursor: text;
  font-size: 17px;
  padding: 15px;
  width: 85vw;
  max-width: 500px;

  &::placeholder {
    color: var(--grey3);
    font-weight: 300;
    letter-spacing: 3px;
  }
  &:focus {
    border: 1px solid var(--blue);
    caret-color: var(--blue);
  }
`;

const SButton = styled.button`
  background-color: var(--blue);
  border-radius: 2px;
  border: none;
  color: var(--white1);
  font-weight: 500;
  padding: 15px;
  width: 100px;

  &:hover:enabled {
    cursor: pointer;
    filter: saturate(1.6);
  }

  &:disabled {
    background-color: var(--light-blue);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
const Icon = styled(VscSearch)`
  bottom: 10px;
  color: var(--light-blue);
  cursor: pointer;
  font-size: 30px;
  font-weight: 200;
  right: 10px;
  position: absolute;

  &:hover {
    color: var(--blue);
  }
`;

interface FromProps {
  onClick: (value: string) => void;
  onChange: (target: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
  value: string;
}

export const SearchForm: React.FC<FromProps> = (props) => {
  const { value, isDisabled, onChange, onClick } = props;

  return (
    <SForm>
      <div style={{ position: 'relative' }}>
        <SInput
          autoComplete="off"
          placeholder="Nome do Artista..."
          id="input"
          required
          onChange={onChange}
          value={value}
          type="text"
          data-testid="search-artist-input"
        />
        <Icon onClick={() => onClick(value)} />
      </div>
      <SButton
        onClick={() => onClick(value)}
        disabled={isDisabled}
        type="button"
        data-testid="search-artist-button">
        Pesquisar
      </SButton>
    </SForm>
  );
};
