import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { useApp } from '../context/AppContext';
import VideoPlayer from '../components/VideoPlayer/Player';
import ChannelList from '../components/ChannelList/ChannelList';
import ActivationForm from '../components/Activation/ActivationForm';
import Toast from 'react-native-toast-message';
import { isLargeDevice } from '../utils/helpers';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const { colors, isDark, toggleTheme } = useTheme();
  const {
    isActivated,
    play,
    deactivate,
    searchTerm,
    updateSearchTerm,
    groups,
    selectedGroup,
    updateSelectedGroup,
    reload,
    networkStatus,
  } = useApp();

  const [showActivation, setShowActivation] = useState(!isActivated);
  const isLarge = useMemo(() => isLargeDevice(), []);
  const styles = useMemo(() => createStyles(colors, isLarge), [colors, isLarge]);

  useEffect(() => {
    setShowActivation(!isActivated);
  }, [isActivated]);

  const handleActivated = () => {
    setShowActivation(false);
    reload();
  };

  const handleChannelPress = (channel) => {
    play(channel);
  };

  const handleNewList = async () => {
    await deactivate();
    setShowActivation(true);
  };

  if (showActivation) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <ActivationForm onActivated={handleActivated} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {!networkStatus.isConnected && (
        <View style={styles.offlineBanner}>
          <Icon name="wifi-off" size={16} color="#FFF" />
          <Text style={styles.offlineText}>Sem conexão com a internet</Text>
        </View>
      )}

      <View style={styles.mainContainer}>
        {/* Player */}
        <View style={styles.playerContainer}>
          <VideoPlayer />
        </View>

        {/* Sidebar de canais */}
        <View style={styles.sidebarContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Canais</Text>
            <View style={styles.headerButtons}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={toggleTheme}
              >
                <Icon
                  name={isDark ? 'light-mode' : 'dark-mode'}
                  size={24}
                  color={colors.text}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={handleNewList}
              >
                <Icon name="refresh" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Busca */}
          <View style={styles.searchContainer}>
            <Icon name="search" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar canais..."
              placeholderTextColor={colors.textSecondary}
              value={searchTerm}
              onChangeText={updateSearchTerm}
            />
            {searchTerm !== '' && (
              <TouchableOpacity onPress={() => updateSearchTerm('')}>
                <Icon name="close" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>

          {/* Filtros por grupo */}
          {groups.length > 1 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.groupsContainer}
              contentContainerStyle={styles.groupsContent}
            >
              {groups.map((group) => (
                <TouchableOpacity
                  key={group}
                  style={[
                    styles.groupChip,
                    selectedGroup === group && styles.groupChipActive,
                  ]}
                  onPress={() => updateSelectedGroup(group)}
                >
                  <Text
                    style={[
                      styles.groupChipText,
                      selectedGroup === group && styles.groupChipTextActive,
                    ]}
                  >
                    {group === 'all' ? 'Todos' : group}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {/* Lista de canais */}
          <ChannelList onChannelPress={handleChannelPress} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (colors, isLarge) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  offlineBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.error,
    padding: 8,
    gap: 8,
  },
  offlineText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
  mainContainer: {
    flex: 1,
    flexDirection: isLarge ? 'row' : 'column',
  },
  playerContainer: {
    flex: isLarge ? 2 : 1,
    backgroundColor: colors.background,
  },
  sidebarContainer: {
    flex: 1,
    backgroundColor: colors.surface,
    borderLeftWidth: isLarge ? 1 : 0,
    borderTopWidth: isLarge ? 0 : 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 16,
    height: 48,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    color: colors.text,
    fontSize: 16,
  },
  groupsContainer: {
    maxHeight: 52,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  groupsContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  groupChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  groupChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  groupChipText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
  },
  groupChipTextActive: {
    color: '#FFF',
  },
});

export default HomeScreen;
