import React, { useState } from 'react';
import { searchAlbumsAPI } from '../../shared/services';
import { Header, Loading } from '../../shared/components';
import { IApiResponse } from '../../shared/interfaces';
import { Searching, SearchForm } from './components';

interface SearchProps {}

interface IValue {
  input: string;
  search: string;
}

export const Search: React.FC<SearchProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [value, setValue] = useState<IValue>({ input: '', search: '' });
  const [data, setData] = useState<IApiResponse[]>();

  const handleChangeInput = ({
    target: { value: values },
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const MIN_CARACTERES = 2;
    setValue({ input: values, search: values });
    setIsDisabled(values.length < MIN_CARACTERES);
  };

  const handleClick = (name: string): void => {
    setLoading(true);
    searchAlbumsAPI(name).then((response) => {
      setData(response);
      setValue({ ...value, input: '' });
      setIsDisabled(true);
      setLoading(false);
    });
  };

  return (
    <>
      <Header />
      <div data-testid="page-search">
        <SearchForm
          isDisabled={isDisabled}
          value={value.input}
          onChange={handleChangeInput}
          onClick={() => handleClick(value.input)}
        />
        {loading ? <Loading /> : data && <Searching data={data} value={value.search} />}
      </div>
    </>
  );
};
