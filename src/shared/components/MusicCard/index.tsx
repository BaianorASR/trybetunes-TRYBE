import moment from 'moment';
import React, { useState, memo } from 'react';
import styled from 'styled-components';
import { AiFillHeart } from 'react-icons/ai';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';
import { Loading } from '..';
import { IAlbumTracks } from '../../interfaces';

const SMusicName = styled.p``;
const SList = styled.div`
  display: flex;
  color: var(--dark);
  align-items: center;
  align-content: flex-start;
  margin: 2px;
  gap: 2px;
  justify-content: space-between;
  font-weight: 300;
  font-size: 1.1rem;

  & * {
    padding: 0.4rem;
  }

  & p {
    flex-shrink: 0;
    flex-grow: 1;
    font-weight: 400;
    background-color: var(--white3);
  }

  & aside {
    background-color: var(--grey3);
    color: var(--bege);

    label {
      margin-left: 0.3rem;
      position: relative;
    }
  }
`;

const SCheckBox = styled(AiFillHeart)`
  font-size: 2.5rem;
  bottom: -4px;
  left: -6px;
  color: var(${(props: { checked: boolean }) => (props.checked ? '--red' : '--grey1')});
  position: absolute;
`;

interface IMagicCardProps {
  track: IAlbumTracks;
  setMusic?: (music: string) => void;
  favorites: number[];
  UpdateFavorites: () => void;
}

const MusicCard: React.FC<IMagicCardProps> = ({
  track,
  setMusic,
  favorites,
  UpdateFavorites,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);

  const handleFavoriteSongs = (
    { target: { checked } }: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ): void => {
    setLoading(true);
    if (checked) {
      addSong({ trackId: id }).then(() => {
        setLoading(false);
        setCheck(checked);
      });
    } else {
      removeSong({ trackId: id }).then(() => {
        setLoading(false);
        setCheck(checked);
        UpdateFavorites();
      });
    }
  };

  const handleLocalStorage = (id: number): boolean => favorites.includes(id) || check;

  const getSongMinutes = (ms: number): string => moment.utc(ms).format('mm:ss');

  const handleMusicSelect = (url: string) => setMusic && setMusic(url);

  const handleMaxLength = (str: string): string => {
    const MAX_LENGTH = 20;
    return str.length < MAX_LENGTH ? str : `${str.substring(0, MAX_LENGTH)}...`;
  };

  return (
    <>
      {loading && <Loading />}
      <SList>
        <SMusicName onClick={() => handleMusicSelect(track.previewUrl)}>
          {handleMaxLength(track.trackName)}
        </SMusicName>
        <aside>
          <span>{getSongMinutes(track.trackTimeMillis)}</span>
          <span>{`$${track.trackPrice}`}</span>
          <audio
            data-testid="audio-component"
            src={track.previewUrl}
            controls
            style={{ display: 'none' }}>
            <track kind="captions" />
          </audio>
          <label htmlFor={`${track.trackId}`}>
            <SCheckBox checked={handleLocalStorage(track.trackId)} />
            <input
              style={{ visibility: 'hidden' }}
              data-testid={`checkbox-music-${track.trackId}`}
              checked={handleLocalStorage(track.trackId)}
              type="checkbox"
              id={`${track.trackId}`}
              onChange={(e) => handleFavoriteSongs(e, track.trackId)}
            />
          </label>
        </aside>
      </SList>
    </>
  );
};

export default memo(MusicCard);
