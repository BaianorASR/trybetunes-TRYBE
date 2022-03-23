import React, { memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IApiResponse } from '../../../shared/interfaces';

const SCard = styled.div`
  display: flex;
  background-color: var(--white2);
  flex-shrink: 0;
  height: 160px;
  width: 275px;

  @media (max-width: 400px) {
    width: 95%;
  }
`;

const SLeft = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: center;
  margin: 10px;
  width: 100px;

  & img + * {
    align-self: center;
    background-color: var(--light-blue);
    color: var(--blue);
    cursor: pointer;
    padding: 5px;
    text-decoration: none;
    text-align: center;
    width: 100%;
  }

  & img + *:hover {
    filter: brightness(0.9);
  }
`;

const SImg = styled.img`
  height: 100px;
  width: 100px;

  &:hover {
    filter: brightness(1.3);
  }
`;

const SBottom = styled.div`
  display: flex;
  align-content: space-between;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  margin: 10px 10px 10px 0;
  width: 100%;

  & h4 {
    color: var(--dark);
    font-size: 15px;
    font-weight: 500;
  }

  & p {
    color: var(--grey3);
    font-size: 14px;
    margin-top: 20px;
  }

  & p + p {
    color: var(--blue);
    width: 100%;
    position: relative;

    span {
      color: var(--grey3);
      position: absolute;
      right: 0;
    }
  }
`;

interface ICardProps {
  data: IApiResponse;
}

const Card: React.FC<ICardProps> = ({ data }): JSX.Element => {
  const handleMaxLength = (string: string, value: string): string => {
    const MAX_LENGTH = Number(value);
    return string.length < MAX_LENGTH ? string : `${string.substring(0, MAX_LENGTH)}...`;
  };

  const handleDateFormate = (date: string) => new Date(date).toLocaleDateString('pt-BR');

  return (
    <SCard>
      <SLeft>
        <SImg src={data.artworkUrl100} />
        <Link
          to={`/album/${data.collectionId}`}
          data-testid={`link-to-album-${data.collectionId}`}>
          Ouça agora
        </Link>
      </SLeft>
      <SBottom>
        <h4>{handleMaxLength(data.artistName, '30')}</h4>
        <p>{handleMaxLength(data.collectionName, '60')}</p>
        <p>
          {`$${data.collectionPrice}`}
          <span>{handleDateFormate(data.releaseDate)}</span>
        </p>
      </SBottom>
    </SCard>
  );
};

export default memo(Card);
