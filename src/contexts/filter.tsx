import React, { createContext, useEffect, useState } from 'react';
import { Order } from '../enums/enums';

interface IProps {
  children: React.ReactNode;
}

export const FilterContext = createContext({
  currency: 'usd',
  order: Order.marketCapDesc as string,
  perPage: 10,
  page: 1,
  searchString: '',
  setCurrency: () => {},
  setOrder: () => {},
  setPerPage: () => {},
  setPage: () => {},
  setSearchString: () => {},
});

export const FilterProvider = ({ children }: IProps) => {
  const [currency, setCurrency] = useState<string>('usd');
  const [searchString, setSearchString] = useState<string>('');
  const [order, setOrder] = useState<string>(Order.marketCapDesc);
  const [perPage, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    return setPage(1);
  }, [currency, order, perPage]);

  return (
    <FilterContext.Provider
      value={{
        currency,
        order,
        perPage,
        page,
        searchString,
        setSearchString,
        setPage,
        setCurrency,
        setOrder,
        setPerPage,
      }}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
