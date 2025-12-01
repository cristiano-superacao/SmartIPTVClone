import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../context/ThemeContext';
import { useApp } from '../context/AppContext';
import ChannelItem from '../components/ChannelList/ChannelItem';

const HistoryScreen = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { history, channels, isFavorite, toggleFavorite, playChannel, clearHistory } = useApp();

  // Mapear histórico para canais completos
  const historyChannels = history
    .map(historyItem => {
      const channel = channels.find(ch => ch.id === historyItem.channelId);
      return channel ? { ...channel, watchedAt: historyItem.watchedAt } : null;
    })
    .filter(Boolean)
    .reverse(); // Mais recentes primeiro

  const handlePlay = (channel) => {
    playChannel(channel);
  };

  const handleClearHistory = () => {
    clearHistory();
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Icon name="history" size={64} color={colors.textSecondary} />
      <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
        Nenhum histórico
      </Text>
      <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
        Os canais que você assistir aparecerão aqui
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerTitle}>{t('recent')}</Text>
        <Text style={styles.headerSubtitle}>
          {historyChannels.length} {historyChannels.length === 1 ? 'canal' : 'canais'}
        </Text>
      </View>
      {historyChannels.length > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClearHistory}
        >
          <Icon name="delete-outline" size={20} color={colors.error} />
          <Text style={[styles.clearText, { color: colors.error }]}>
            Limpar
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
    },
    headerSubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 4,
    },
    clearButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
    },
    clearText: {
      fontSize: 14,
      fontWeight: '500',
      marginLeft: 4,
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 40,
      paddingTop: 100,
    },
    emptyText: {
      fontSize: 18,
      fontWeight: '600',
      marginTop: 16,
      textAlign: 'center',
    },
    emptySubtext: {
      fontSize: 14,
      marginTop: 8,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={historyChannels}
        renderItem={({ item }) => (
          <ChannelItem
            item={item}
            onPress={handlePlay}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite(item.id)}
          />
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={
          historyChannels.length === 0 ? { flex: 1 } : null
        }
      />
    </View>
  );
};

export default HistoryScreen;
