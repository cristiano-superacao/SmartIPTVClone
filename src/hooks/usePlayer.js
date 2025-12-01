import { useState, useCallback, useRef, useEffect } from 'react';
import storageService from '../services/storage';
import { STORAGE_KEYS } from '../utils/constants';

/**
 * Hook para gerenciar o player de vídeo
 */
export const usePlayer = () => {
  const [currentChannel, setCurrentChannel] = useState(null);
  const [playerState, setPlayerState] = useState('idle'); // idle, loading, playing, paused, error
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffering, setBuffering] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [history, setHistory] = useState([]);
  
  const videoRef = useRef(null);

  // Carregar histórico
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const stored = await storageService.getItem(STORAGE_KEYS.HISTORY);
      if (stored) {
        setHistory(stored);
      }
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    }
  };

  // Salvar histórico
  const saveToHistory = useCallback(async (channel) => {
    try {
      const newHistory = [
        { ...channel, watchedAt: new Date().toISOString() },
        ...history.filter(h => h.id !== channel.id),
      ].slice(0, 50); // Manter apenas últimos 50
      
      setHistory(newHistory);
      await storageService.setItem(STORAGE_KEYS.HISTORY, newHistory);
    } catch (error) {
      console.error('Erro ao salvar histórico:', error);
    }
  }, [history]);

  // Reproduzir canal
  const play = useCallback(async (channel) => {
    try {
      setCurrentChannel(channel);
      setPlayerState('loading');
      await saveToHistory(channel);
      await storageService.setItem(STORAGE_KEYS.LAST_CHANNEL, channel);
    } catch (error) {
      console.error('Erro ao reproduzir:', error);
      setPlayerState('error');
    }
  }, [saveToHistory]);

  // Pausar
  const pause = useCallback(() => {
    setPlayerState('paused');
  }, []);

  // Retomar
  const resume = useCallback(() => {
    setPlayerState('playing');
  }, []);

  // Parar
  const stop = useCallback(() => {
    setCurrentChannel(null);
    setPlayerState('idle');
    setCurrentTime(0);
    setDuration(0);
  }, []);

  // Toggle play/pause
  const togglePlayPause = useCallback(() => {
    if (playerState === 'playing') {
      pause();
    } else if (playerState === 'paused') {
      resume();
    }
  }, [playerState, pause, resume]);

  // Buscar posição (seek)
  const seek = useCallback((time) => {
    if (videoRef.current) {
      videoRef.current.seek(time);
      setCurrentTime(time);
    }
  }, []);

  // Avançar
  const forward = useCallback((seconds = 10) => {
    const newTime = Math.min(currentTime + seconds, duration);
    seek(newTime);
  }, [currentTime, duration, seek]);

  // Retroceder
  const rewind = useCallback((seconds = 10) => {
    const newTime = Math.max(currentTime - seconds, 0);
    seek(newTime);
  }, [currentTime, seek]);

  // Toggle mudo
  const toggleMute = useCallback(() => {
    setMuted(prev => !prev);
  }, []);

  // Ajustar volume
  const adjustVolume = useCallback((newVolume) => {
    setVolume(Math.max(0, Math.min(1, newVolume)));
    if (newVolume > 0 && muted) {
      setMuted(false);
    }
  }, [muted]);

  // Aumentar volume
  const volumeUp = useCallback(() => {
    adjustVolume(volume + 0.1);
  }, [volume, adjustVolume]);

  // Diminuir volume
  const volumeDown = useCallback(() => {
    adjustVolume(volume - 0.1);
  }, [volume, adjustVolume]);

  // Ajustar velocidade
  const adjustPlaybackRate = useCallback((rate) => {
    setPlaybackRate(Math.max(0.25, Math.min(2, rate)));
  }, []);

  // Handlers de eventos do player
  const onLoad = useCallback((data) => {
    setDuration(data.duration);
    setPlayerState('playing');
  }, []);

  const onProgress = useCallback((data) => {
    setCurrentTime(data.currentTime);
  }, []);

  const onBuffer = useCallback(({ isBuffering }) => {
    setBuffering(isBuffering);
  }, []);

  const onError = useCallback((error) => {
    console.error('Erro no player:', error);
    setPlayerState('error');
  }, []);

  const onEnd = useCallback(() => {
    setPlayerState('idle');
    setCurrentTime(0);
  }, []);

  // Limpar histórico
  const clearHistory = useCallback(async () => {
    try {
      setHistory([]);
      await storageService.removeItem(STORAGE_KEYS.HISTORY);
    } catch (error) {
      console.error('Erro ao limpar histórico:', error);
    }
  }, []);

  // Restaurar último canal
  const restoreLastChannel = useCallback(async () => {
    try {
      const lastChannel = await storageService.getItem(STORAGE_KEYS.LAST_CHANNEL);
      if (lastChannel) {
        return lastChannel;
      }
    } catch (error) {
      console.error('Erro ao restaurar último canal:', error);
    }
    return null;
  }, []);

  return {
    // Estado
    currentChannel,
    playerState,
    currentTime,
    duration,
    buffering,
    muted,
    volume,
    playbackRate,
    history,
    videoRef,
    
    // Ações
    play,
    pause,
    resume,
    stop,
    togglePlayPause,
    seek,
    forward,
    rewind,
    toggleMute,
    adjustVolume,
    volumeUp,
    volumeDown,
    adjustPlaybackRate,
    clearHistory,
    restoreLastChannel,
    
    // Event handlers
    onLoad,
    onProgress,
    onBuffer,
    onError,
    onEnd,
  };
};

export default usePlayer;
