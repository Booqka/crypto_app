import { useCallback, useState } from 'react';
import Toast from 'react-native-toast-message';

import api from '../api/api';

interface ReturnType {
  loading: boolean;
  data?: any;
  fetchData: () => void;
  setCoins: (coins: any) => void;
  setLoading: (loading: boolean) => void;
}

const useGlobalData = (): ReturnType => {
  const [coins, setCoins] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('global');
      setCoins(response.data.data);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error?.message,
      });
    }
    setLoading(false);
  }, []);

  return {
    fetchData,
    loading,
    setLoading,
    data: coins,
    setCoins,
  };
};

export default useGlobalData;
