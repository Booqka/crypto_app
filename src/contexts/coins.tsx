import React, { createContext, useEffect, useState } from 'react';
import api from '../api/api';

interface IProps {
  children: React.ReactNode;
}

export const CoinsContext = createContext({
  coins: [
    {
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
    },
  ],
});

export const CoinsProvider = ({ children }: IProps) => {
  const [coins, setCoins] = useState<Array<any>>([]);

  useEffect(() => {
    const getCoins = async () => {
      const list = await api.get('coins/list');
      setCoins(list.data);
    };
    getCoins();
  }, []);

  return (
    <CoinsContext.Provider value={{ coins }}>{children}</CoinsContext.Provider>
  );
};

export default CoinsProvider;
