import { useContext, useEffect, useState } from 'react';

import useDebounce from './useDebounce';
import { FilterContext } from '../contexts/filter';

interface ReturnType {
  search: string;
  setSearch: (search?: string) => void;
}

const useSearch = (): ReturnType => {
  const { setSearchString } = useContext(FilterContext);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setSearchString(debouncedSearch);
  }, [debouncedSearch, setSearchString]);

  return {
    search,
    setSearch,
  };
};

export default useSearch;
