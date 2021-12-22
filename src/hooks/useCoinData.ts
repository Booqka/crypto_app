import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';

import api from '../api/api';

interface ReturnType {
  loading: boolean;
  coin?: { [k: string]: any };
}

const useCoinData = (id: string): ReturnType => {
  const [coin, setCoin] = useState(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCoin = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `coins/${id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`,
        );
        setCoin(response.data.data);
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: error?.message,
        });
      }
      setLoading(false);
    };

    fetchCoin();
  }, [id]);

  return {
    loading,
    coin,
  };
};

export default useCoinData;
