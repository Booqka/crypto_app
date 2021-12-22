import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';

import api from '../api/api';

interface ReturnType {
  loading: boolean;
  coins?: Array<any>;
}

const useTrending = (): ReturnType => {
  const [coins, setCoins] = useState<Array<any>>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get('search/trending');
        setCoins(response.data.coins);
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: error?.message,
        });
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return {
    loading,
    coins,
  };
};

export default useTrending;
