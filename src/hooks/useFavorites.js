import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';
import storageService from '../services/storage';
import { STORAGE_KEYS } from '../utils/constants';

/**
 * Hook para gerenciar favoritos
 */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carregar favoritos do storage
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const stored = await storageService.getItem(STORAGE_KEYS.FAVORITES);
      if (stored) {
        setFavorites(stored);
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Adicionar aos favoritos
  const addFavorite = useCallback(async (channel) => {
    try {
      const newFavorites = [...favorites, { ...channel, favoritedAt: new Date().toISOString() }];
      setFavorites(newFavorites);
      await storageService.setItem(STORAGE_KEYS.FAVORITES, newFavorites);
      return true;
    } catch (error) {
      console.error('Erro ao adicionar favorito:', error);
      return false;
    }
  }, [favorites]);

  // Remover dos favoritos
  const removeFavorite = useCallback(async (channelId) => {
    try {
      const newFavorites = favorites.filter(fav => fav.id !== channelId);
      setFavorites(newFavorites);
      await storageService.setItem(STORAGE_KEYS.FAVORITES, newFavorites);
      return true;
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
      return false;
    }
  }, [favorites]);

  // Toggle favorito
  const toggleFavorite = useCallback(async (channel) => {
    const isFavorite = favorites.some(fav => fav.id === channel.id);
    if (isFavorite) {
      return await removeFavorite(channel.id);
    } else {
      return await addFavorite(channel);
    }
  }, [favorites, addFavorite, removeFavorite]);

  // Verificar se é favorito
  const isFavorite = useCallback((channelId) => {
    return favorites.some(fav => fav.id === channelId);
  }, [favorites]);

  // Limpar favoritos
  const clearFavorites = useCallback(async () => {
    try {
      setFavorites([]);
      await storageService.removeItem(STORAGE_KEYS.FAVORITES);
      return true;
    } catch (error) {
      console.error('Erro ao limpar favoritos:', error);
      return false;
    }
  }, []);

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
  };
};

export default useFavorites;
