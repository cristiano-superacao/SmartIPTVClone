import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

/**
 * Hook para verificar status da conexão
 */
export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [connectionType, setConnectionType] = useState('unknown');
  const [isInternetReachable, setIsInternetReachable] = useState(true);

  useEffect(() => {
    // Verificar estado inicial
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected ?? true);
      setConnectionType(state.type);
      setIsInternetReachable(state.isInternetReachable ?? true);
    });

    // Listener para mudanças
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? true);
      setConnectionType(state.type);
      setIsInternetReachable(state.isInternetReachable ?? true);
    });

    return () => unsubscribe();
  }, []);

  return {
    isConnected,
    connectionType,
    isInternetReachable,
    isOffline: !isConnected || !isInternetReachable,
  };
};

export default useNetworkStatus;
