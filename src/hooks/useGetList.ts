import { useCallback, useContext, useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';

import api from '../api/api';
import { FilterContext } from '../contexts/filter';
import { CoinsContext } from '../contexts/coins';

interface ReturnType {
  loading: boolean;
  data?: Array<any>;
  fetchData: () => void;
  setCoins: (coins: Array<any>) => void;
  setLoading: (loading: boolean) => void;
}

const useGetList = (): ReturnType => {
  const { currency, order, perPage, page, searchString } =
    useContext(FilterContext);
  const { coins: allCoins } = useContext(CoinsContext);
  const [coins, setCoins] = useState<Array<any> | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `coins/markets?vs_currency=${currency}&order=${order}&per_page=${perPage}&page=${page}`,
      );
      setCoins(response.data);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error.message,
      });
    }
    setLoading(false);
  }, [page, currency, order, perPage]);

  useEffect(() => {
    setLoading(true);
    if (searchString) {
      const searchResult = allCoins.filter(
        coin =>
          coin.name.includes(searchString) ||
          coin.symbol.includes(searchString),
      );
      setCoins(searchResult);
    } else {
      fetchData();
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString]);

  return {
    fetchData,
    loading,
    setLoading,
    data: coins,
    setCoins,
  };
};

export default useGetList;
