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

const FavoritesScreen = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { channels, favorites, isFavorite, toggleFavorite, playChannel } = useApp();

  // Filtrar apenas favoritos
  const favoriteChannels = channels.filter(channel => isFavorite(channel.id));

  const handlePlay = (channel) => {
    playChannel(channel);
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Icon name="favorite-border" size={64} color={colors.textSecondary} />
      <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
        {t('noChannels')}
      </Text>
      <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
        Adicione canais aos favoritos para vê-los aqui
      </Text>
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('favorites')}</Text>
        <Text style={styles.headerSubtitle}>
          {t('channelCount', { count: favoriteChannels.length })}
        </Text>
      </View>
      <FlatList
        data={favoriteChannels}
        renderItem={({ item }) => (
          <ChannelItem
            item={item}
            onPress={handlePlay}
            onToggleFavorite={toggleFavorite}
            isFavorite={true}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={
          favoriteChannels.length === 0 ? { flex: 1 } : null
        }
      />
    </View>
  );
};

export default FavoritesScreen;
