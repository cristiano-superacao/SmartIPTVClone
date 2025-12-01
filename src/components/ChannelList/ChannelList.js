import React, { useCallback, useMemo } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';
import ChannelItem from './ChannelItem';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';

const ChannelList = ({ onChannelPress }) => {
  const { colors } = useTheme();
  const {
    channels,
    loading,
    hasMore,
    loadMore,
    currentChannel,
    toggleFavorite,
    isFavorite,
  } = useApp();

  const styles = useMemo(() => createStyles(colors), [colors]);

  const renderItem = useCallback(({ item }) => (
    <ChannelItem
      item={item}
      isActive={currentChannel?.id === item.id}
      onPress={onChannelPress}
      onToggleFavorite={toggleFavorite}
      isFavorite={isFavorite(item.id)}
    />
  ), [currentChannel, onChannelPress, toggleFavorite, isFavorite]);

  const keyExtractor = useCallback((item) => String(item.id), []);

  const getItemLayout = useCallback((data, index) => ({
    length: 72,
    offset: 72 * index,
    index,
  }), []);

  const renderFooter = useCallback(() => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  }, [loading, colors, styles]);

  const renderEmpty = useCallback(() => {
    if (loading) return null;
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Nenhum canal encontrado</Text>
      </View>
    );
  }, [loading, styles]);

  return (
    <FlatList
      data={channels}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={20}
      removeClippedSubviews={true}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      style={styles.list}
    />
  );
};

const createStyles = (colors) => StyleSheet.create({
  list: {
    flex: 1,
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  empty: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
});

export default ChannelList;
