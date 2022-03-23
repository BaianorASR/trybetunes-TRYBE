import React, { memo } from 'react';
import styled from 'styled-components';

const SForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SInputControl = styled.div`
  height: 50px;
  position: relative;
  width: 450px;

  @media (max-width: 768px) {
    width: 80vw;
  }
`;

const SInput = styled.input`
  border: none;
  border-bottom: 2px solid silver;
  bottom: 0;
  color: var(--dark);
  font-size: 17px;
  padding: 25px 10px 5px 10px;
  position: absolute;
  width: 100%;

  &:focus ~ label,
  &:valid ~ label {
    color: var(--blue2);
    font-size: 15px;
    font-weight: 500;
    left: 10px;
    transform: translateY(-16px);
  }
`;

const SUnderline = styled.div`
  bottom: 0;
  height: 2px;
  position: absolute;
  width: 100%;

  &:before {
    content: '';
    background: var(--blue);
    height: 100%;
    position: absolute;
    transform: scaleX(0);
    transition: transform 0.5s ease;
    width: 100%;
  }

  ${SInput}:focus + &:before {
    transform: scaleX(1);
  }
`;

const SLabel = styled.label`
  bottom: 14px;
  color: grey;
  font-weight: 300;
  font-size: 20px;
  left: 18px;
  pointer-events: none;
  position: absolute;
  transition: all 0.3s ease;
`;

const SButton = styled.button`
  background-color: var(--blue);
  border-radius: 2px;
  border: none;
  color: var(--white1);
  font-weight: 500;
  padding: 10px;
  width: 100px;
`;

interface FromProps {
  onClick: (value: string) => void;
  onChange: (target: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
  value: string;
}

const Form: React.FC<FromProps> = (props) => {
  const { value, isDisabled, onChange, onClick } = props;

  return (
    <SForm>
      <SInputControl>
        <SInput
          id="input"
          required
          onChange={onChange}
          value={value}
          type="text"
          data-testid="login-name-input"
        />
        <SUnderline />
        <SLabel htmlFor="input">Username</SLabel>
      </SInputControl>
      <SButton
        onClick={() => onClick(value)}
        disabled={isDisabled}
        type="button"
        data-testid="login-submit-button">
        Entrar
      </SButton>
    </SForm>
  );
};

export default memo(Form);
