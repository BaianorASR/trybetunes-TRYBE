import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getMusics, getFavoriteSongs } from '../../shared/services';
import { Header, Loading, MusicCard } from '../../shared/components';
import { IAlbumTracks } from '../../shared/interfaces';

const SAudio = styled.audio``;
const SMusicImage = styled.img``;
const SPlayerContainer = styled.section`
  position: relative;
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  align-items: flex-end;

  & ${SAudio} {
    flex-grow: 2;
    background-color: #f1f3f4;
    height: 60px;
  }

  & ${SMusicImage} {
    border: 1px solid var(--grey3);
    max-width: 100px;
  }
`;

const SMusicContainer = styled.section`
  max-width: 500px;
  margin: auto;
  margin-top: 20px;
  max-height: 70vh;
  overflow-y: scroll;
  background-color: var(--grey3);
  padding: 2px;
`;

export const Favorites = () => {
  const [musics, setMusics] = useState<IAlbumTracks[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<number[]>([]);

  const myReduce = (favoritesTracks: any[]) =>
    favoritesTracks.reduce(
      async (acc, curr) => [...(await acc), ...(await getMusics(curr))],
      [],
    );

  const UpdateFavorites = async (): Promise<void> => {
    setLoading(true);
    const response = await getFavoriteSongs();
    const responseMap = response.map((each: { trackId: number }) => each.trackId);
    setMusics(await myReduce(responseMap));
    setFavorites(responseMap);
    setLoading(false);
  };

  useEffect(() => {
    // Error de memory leak
    // https://medium.com/technology-hits/how-to-fix-memory-leak-issue-in-react-js-using-hook-a5ecbf9becf8
    const abortController = new AbortController();
    setLoading(true);
    const fetchFavoritesTracks = async () => {
      const response = await getFavoriteSongs();
      const responseMap = response.map((each: { trackId: number }) => each.trackId);
      setMusics(await myReduce(responseMap));
      setFavorites(responseMap);
      setLoading(false);
    };
    fetchFavoritesTracks();
    return () => abortController.abort();
  }, []);

  return (
    <>
      <Header />
      <div data-testid="page-favorites">
        {loading && <Loading />}
        <SMusicContainer>
          {musics?.map((each, index) => (
            <MusicCard
              key={index}
              track={each}
              favorites={favorites}
              UpdateFavorites={UpdateFavorites}
            />
          ))}
        </SMusicContainer>
        <SPlayerContainer>
          {/* TO-DO arrumar o a seleção de musica do player */}
          <SMusicImage src={musics[0]?.artworkUrl100} alt="" />
          <SAudio src={musics[0]?.previewUrl} controls />
        </SPlayerContainer>
      </div>
    </>
  );
};
