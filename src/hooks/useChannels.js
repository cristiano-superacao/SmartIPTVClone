import { useState, useCallback, useEffect } from 'react';
import apiService from '../services/api';
import storageService from '../services/storage';
import { STORAGE_KEYS, PAGINATION } from '../utils/constants';
import { useDebounce } from './useDebounce';

/**
 * Hook para gerenciar canais
 */
export const useChannels = (activationCode = 'DEFAULT') => {
  const [channels, setChannels] = useState([]);
  const [filteredChannels, setFilteredChannels] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('all');
  
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Buscar canais
  const fetchChannels = useCallback(async (pageNum = 1, reset = false) => {
    if (loading || (!hasMore && !reset)) return;

    setLoading(true);
    setError(null);

    try {
      const result = await apiService.fetchChannels({
        page: pageNum,
        limit: PAGINATION.channelsPerPage,
        search: debouncedSearchTerm,
        group: selectedGroup === 'all' ? '' : selectedGroup,
        activationCode,
      });

      if (result.success) {
        const newChannels = result.data.channels || [];
        
        if (reset) {
          setChannels(newChannels);
        } else {
          setChannels(prev => [...prev, ...newChannels]);
        }
        
        setHasMore(result.data.hasMore);
        setPage(pageNum);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Erro ao carregar canais');
      console.error('Erro ao buscar canais:', err);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, debouncedSearchTerm, selectedGroup, activationCode]);

  // Buscar grupos
  const fetchGroups = useCallback(async () => {
    try {
      const result = await apiService.fetchGroups(activationCode);
      if (result.success) {
        setGroups(['all', ...(result.data.groups || [])]);
      }
    } catch (err) {
      console.error('Erro ao buscar grupos:', err);
    }
  }, [activationCode]);

  // Buscar canal específico
  const fetchChannel = useCallback(async (channelId) => {
    try {
      const result = await apiService.fetchChannel(channelId, activationCode);
      return result.success ? result.data.channel : null;
    } catch (err) {
      console.error('Erro ao buscar canal:', err);
      return null;
    }
  }, [activationCode]);

  // Atualizar termo de busca
  const updateSearchTerm = useCallback((term) => {
    setSearchTerm(term);
    setPage(1);
    setHasMore(true);
  }, []);

  // Atualizar grupo selecionado
  const updateSelectedGroup = useCallback((group) => {
    setSelectedGroup(group);
    setPage(1);
    setHasMore(true);
  }, []);

  // Recarregar canais
  const reload = useCallback(() => {
    setPage(1);
    setHasMore(true);
    setChannels([]);
    fetchChannels(1, true);
  }, [fetchChannels]);

  // Carregar mais canais (infinite scroll)
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchChannels(page + 1);
    }
  }, [loading, hasMore, page, fetchChannels]);

  // Efeito para buscar quando search/group mudar
  useEffect(() => {
    if (debouncedSearchTerm !== '' || selectedGroup !== 'all') {
      fetchChannels(1, true);
    }
  }, [debouncedSearchTerm, selectedGroup]);

  // Carregar grupos ao montar
  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  return {
    channels,
    groups,
    loading,
    error,
    hasMore,
    searchTerm,
    selectedGroup,
    fetchChannels,
    fetchChannel,
    updateSearchTerm,
    updateSelectedGroup,
    reload,
    loadMore,
  };
};

export default useChannels;
