import React from 'react';
import styled from 'styled-components';
import { IApiResponse } from '../../../shared/interfaces';
import Card from './Card';

const SSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  & h2 {
    color: var(--dark);
    font-weight: 300;
    padding: 20px;
  }
`;

const SCardsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-flow: row wrap;
  margin: auto;
  justify-content: center;
`;

interface ISearchingProps {
  data: IApiResponse[];
  value: string;
}

export const Searching: React.FC<ISearchingProps> = ({ data, value }): JSX.Element => {
  return data.length ? (
    <SSection>
      <h2>Resultado de álbuns de: {value}</h2>
      <SCardsContainer>
        {data.map((each, index) => (
          <Card key={index} data={each} />
        ))}
      </SCardsContainer>
    </SSection>
  ) : (
    <h1>Nenhum álbum foi encontrado</h1>
  );
};
