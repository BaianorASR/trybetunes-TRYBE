import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { getFavoriteSongs, getMusics } from '../../shared/services';
import { Header, Loading, MusicCard } from '../../shared/components';
import { IAlbumData, IAlbumTracks } from '../../shared/interfaces';

const SAlbumContainer = styled.section`
  background-color: var(--white2);
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: 10px;
  min-height: 100vh;

  & h1 {
    font-weight: 400;
    color: var(--blue);
    text-align: center;
    padding-bottom: 1rem;
  }
`;

const SImg = styled.img``;
const Stop = styled.div`
  margin: 0 auto;
  position: relative;
  width: 350px;
  box-shadow: 0rem 1rem 3rem rgba(0, 0, 0, 0.25);
  margin-bottom: 2rem;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  background-color: #f1f3f4;

  & .img-box {
    position: relative;
    width: 100%;
    height: 350px;

    ${SImg} {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
    }
  }

  & audio {
    width: 100%;
    outline: none;
  }
`;

const SMusics = styled.div`
  background-color: var(--grey3);
  padding: 0.1rem;
  box-shadow: 0rem 0.5rem 0.5rem rgba(0, 0, 0, 0.4);
`;

interface MatchParams {
  id: string;
}

interface IAlbumProps extends RouteComponentProps<MatchParams> {}

export const Album: React.FC<IAlbumProps> = ({ match: { params } }) => {
  const [dataAlbum, setDataAlbum] = useState<IAlbumData>();
  const [dataTracks, setDataTracks] = useState<IAlbumTracks[]>([]);
  const [favorites, setFavorites] = useState([]);
  const [music, setMusic] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const UpdateFavorites = (): void => {
    setLoading(true);
    getFavoriteSongs().then((data) => {
      setFavorites(data.map((each: { trackId: number }) => each.trackId));
      setLoading(false);
    });
  };

  useEffect((): void => {
    getMusics(params.id).then((data) => {
      setDataAlbum(data[0]);
      setDataTracks(data.slice(1));
    });
  }, [params.id]);

  useEffect(() => {
    UpdateFavorites();
  }, []);

  const getHDAlbumArt = (url: string): string => url.replace('100x100', '1000x1000');

  return (
    <>
      <Header />
      <div data-testid="page-album">
        {loading && <Loading />}
        {dataAlbum && (
          <SAlbumContainer>
            <h1>
              <span data-testid="artist-name">{dataAlbum.artistName}</span>
              {' - '}
              <span data-testid="album-name">{dataAlbum.collectionName}</span>
            </h1>
            <Stop>
              <div className="img-box">
                <SImg
                  src={dataAlbum.artworkUrl100 && getHDAlbumArt(dataAlbum.artworkUrl100)}
                />
              </div>

              <audio controls src={music} autoPlay>
                <track kind="captions" />O seu navegador não suporta o elemento{' '}
                <code>audio</code>.
              </audio>
            </Stop>
            <SMusics>
              {dataTracks.map((each, index) => (
                <section key={index}>
                  <MusicCard
                    track={each}
                    setMusic={setMusic}
                    favorites={favorites}
                    UpdateFavorites={UpdateFavorites}
                  />
                </section>
              ))}
            </SMusics>
          </SAlbumContainer>
        )}
      </div>
    </>
  );
};
