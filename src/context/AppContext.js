import React, { createContext, useContext, useState, useEffect } from 'react';
import storageService from '../services/storage';
import { STORAGE_KEYS } from '../utils/constants';
import useChannels from '../hooks/useChannels';
import useFavorites from '../hooks/useFavorites';
import usePlayer from '../hooks/usePlayer';
import useNetworkStatus from '../hooks/useNetworkStatus';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [activationCode, setActivationCode] = useState('DEFAULT');
  const [isActivated, setIsActivated] = useState(false);
  const [settings, setSettings] = useState({
    autoPlay: true,
    quality: 'auto',
    language: 'pt-BR',
    parentalControl: false,
    notifications: true,
  });

  // Hooks
  const channelsData = useChannels(activationCode);
  const favoritesData = useFavorites();
  const playerData = usePlayer();
  const networkStatus = useNetworkStatus();

  // Carregar configurações
  useEffect(() => {
    loadSettings();
    checkActivation();
  }, []);

  const loadSettings = async () => {
    try {
      const saved = await storageService.getItem(STORAGE_KEYS.SETTINGS);
      if (saved) {
        setSettings(saved);
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    }
  };

  const checkActivation = async () => {
    try {
      const code = await storageService.getItem(STORAGE_KEYS.ACTIVATION_CODE);
      if (code) {
        setActivationCode(code);
        setIsActivated(true);
      }
    } catch (error) {
      console.error('Erro ao verificar ativação:', error);
    }
  };

  const activate = async (code) => {
    try {
      setActivationCode(code);
      setIsActivated(true);
      await storageService.setItem(STORAGE_KEYS.ACTIVATION_CODE, code);
      return true;
    } catch (error) {
      console.error('Erro ao ativar:', error);
      return false;
    }
  };

  const deactivate = async () => {
    try {
      setActivationCode('DEFAULT');
      setIsActivated(false);
      await storageService.removeItem(STORAGE_KEYS.ACTIVATION_CODE);
      return true;
    } catch (error) {
      console.error('Erro ao desativar:', error);
      return false;
    }
  };

  const updateSettings = async (newSettings) => {
    try {
      const updated = { ...settings, ...newSettings };
      setSettings(updated);
      await storageService.setItem(STORAGE_KEYS.SETTINGS, updated);
      return true;
    } catch (error) {
      console.error('Erro ao atualizar configurações:', error);
      return false;
    }
  };

  const resetSettings = async () => {
    try {
      const defaultSettings = {
        autoPlay: true,
        quality: 'auto',
        language: 'pt-BR',
        parentalControl: false,
        notifications: true,
      };
      setSettings(defaultSettings);
      await storageService.setItem(STORAGE_KEYS.SETTINGS, defaultSettings);
      return true;
    } catch (error) {
      console.error('Erro ao resetar configurações:', error);
      return false;
    }
  };

  const value = {
    // Estado geral
    activationCode,
    isActivated,
    settings,
    networkStatus,
    
    // Ações gerais
    activate,
    deactivate,
    updateSettings,
    resetSettings,
    
    // Dados de canais
    ...channelsData,
    
    // Dados de favoritos
    favorites: favoritesData.favorites,
    toggleFavorite: favoritesData.toggleFavorite,
    isFavorite: favoritesData.isFavorite,
    
    // Dados do player
    currentChannel: playerData.currentChannel,
    playerState: playerData.playerState,
    play: playerData.play,
    pause: playerData.pause,
    stop: playerData.stop,
    ...playerData,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
