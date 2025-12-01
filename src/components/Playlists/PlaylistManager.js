import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import ColorPicker from 'react-native-wheel-color-picker';
import { apiService } from '../../services/api';
import Toast from 'react-native-toast-message';

const PlaylistManager = ({ navigation }) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  
  // Form states
  const [currentPlaylist, setCurrentPlaylist] = useState({
    id: null,
    name: '',
    description: '',
    serverType: 'm3u_url',
    serverUrl: '',
    username: '',
    password: '',
    outputFormat: 'm3u_plus',
    logo: '',
    color: '#007AFF',
  });

  useEffect(() => {
    loadPlaylists();
  }, []);

  const loadPlaylists = async () => {
    try {
      setLoading(true);
      const data = await apiService.getPlaylists();
      setPlaylists(data.playlists || []);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: error.message || 'Erro ao carregar playlists',
      });
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPlaylists();
    setRefreshing(false);
  };

  const openCreateModal = () => {
    setCurrentPlaylist({
      id: null,
      name: '',
      description: '',
      serverType: 'm3u_url',
      serverUrl: '',
      username: '',
      password: '',
      outputFormat: 'm3u_plus',
      logo: '',
      color: '#007AFF',
    });
    setEditMode(false);
    setModalVisible(true);
  };

  const openEditModal = (playlist) => {
    setCurrentPlaylist(playlist);
    setEditMode(true);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setShowColorPicker(false);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setCurrentPlaylist({
        ...currentPlaylist,
        logo: result.assets[0].uri,
      });
    }
  };

  const savePlaylist = async () => {
    if (!currentPlaylist.name.trim()) {
      Alert.alert('Erro', 'Nome da playlist é obrigatório');
      return;
    }

    if (!currentPlaylist.serverUrl.trim()) {
      Alert.alert('Erro', 'URL do servidor é obrigatório');
      return;
    }

    if (
      (currentPlaylist.serverType === 'xtream' ||
        currentPlaylist.serverType === 'stalker') &&
      (!currentPlaylist.username.trim() || !currentPlaylist.password.trim())
    ) {
      Alert.alert('Erro', 'Usuário e senha são obrigatórios para este tipo de servidor');
      return;
    }

    try {
      setLoading(true);

      if (editMode) {
        await apiService.updatePlaylist(currentPlaylist.id, {
          name: currentPlaylist.name,
          description: currentPlaylist.description,
          logo: currentPlaylist.logo,
          color: currentPlaylist.color,
        });
        Toast.show({
          type: 'success',
          text1: 'Sucesso',
          text2: 'Playlist atualizada com sucesso',
        });
      } else {
        await apiService.createPlaylist(currentPlaylist);
        Toast.show({
          type: 'success',
          text1: 'Sucesso',
          text2: 'Playlist criada com sucesso',
        });
      }

      closeModal();
      loadPlaylists();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: error.message || 'Erro ao salvar playlist',
      });
    } finally {
      setLoading(false);
    }
  };

  const activatePlaylist = async (id) => {
    try {
      setLoading(true);
      const result = await apiService.activatePlaylist(id);
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: `${result.stats.totalChannels} canais carregados`,
      });
      loadPlaylists();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: error.message || 'Erro ao ativar playlist',
      });
    } finally {
      setLoading(false);
    }
  };

  const deletePlaylist = (playlist) => {
    Alert.alert(
      'Confirmar exclusão',
      `Deseja realmente excluir a playlist "${playlist.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await apiService.deletePlaylist(playlist.id);
              Toast.show({
                type: 'success',
                text1: 'Sucesso',
                text2: 'Playlist excluída com sucesso',
              });
              loadPlaylists();
            } catch (error) {
              Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: error.message || 'Erro ao excluir playlist',
              });
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const renderServerTypeButtons = () => {
    const types = [
      { value: 'm3u_url', label: 'M3U URL', icon: 'link' },
      { value: 'xtream', label: 'Xtream Codes', icon: 'server' },
      { value: 'stalker', label: 'Stalker Portal', icon: 'portal' },
    ];

    return (
      <View style={styles.serverTypeContainer}>
        {types.map((type) => (
          <TouchableOpacity
            key={type.value}
            style={[
              styles.serverTypeButton,
              currentPlaylist.serverType === type.value && styles.serverTypeButtonActive,
            ]}
            onPress={() =>
              setCurrentPlaylist({ ...currentPlaylist, serverType: type.value })
            }
          >
            <MaterialIcons
              name={type.icon}
              size={24}
              color={
                currentPlaylist.serverType === type.value ? '#fff' : '#007AFF'
              }
            />
            <Text
              style={[
                styles.serverTypeText,
                currentPlaylist.serverType === type.value &&
                  styles.serverTypeTextActive,
              ]}
            >
              {type.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderPlaylistCard = (playlist) => {
    return (
      <View key={playlist.id} style={styles.playlistCard}>
        <View style={styles.playlistHeader}>
          {playlist.logo ? (
            <Image source={{ uri: playlist.logo }} style={styles.playlistLogo} />
          ) : (
            <View
              style={[
                styles.playlistLogoPlaceholder,
                { backgroundColor: playlist.color },
              ]}
            >
              <Ionicons name="tv" size={32} color="#fff" />
            </View>
          )}
          
          <View style={styles.playlistInfo}>
            <Text style={styles.playlistName}>{playlist.name}</Text>
            {playlist.description ? (
              <Text style={styles.playlistDescription}>
                {playlist.description}
              </Text>
            ) : null}
            <View style={styles.playlistMeta}>
              <Ionicons name="tv-outline" size={14} color="#666" />
              <Text style={styles.playlistMetaText}>
                {playlist.channelCount || 0} canais
              </Text>
              <Ionicons
                name="server-outline"
                size={14}
                color="#666"
                style={{ marginLeft: 12 }}
              />
              <Text style={styles.playlistMetaText}>
                {playlist.serverType}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.playlistActions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.activateButton]}
            onPress={() => activatePlaylist(playlist.id)}
          >
            <Ionicons name="play-circle" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Ativar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => openEditModal(playlist)}
          >
            <Ionicons name="create-outline" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => deletePlaylist(playlist)}
          >
            <Ionicons name="trash-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1a237e', '#0d47a1']} style={styles.header}>
        <Text style={styles.title}>Gerenciar Playlists</Text>
        <Text style={styles.subtitle}>
          {playlists.length} lista{playlists.length !== 1 ? 's' : ''}
        </Text>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading && playlists.length === 0 ? (
          <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 50 }} />
        ) : playlists.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="list-outline" size={64} color="#ccc" />
            <Text style={styles.emptyStateText}>Nenhuma playlist cadastrada</Text>
            <Text style={styles.emptyStateSubtext}>
              Toque no botão + para adicionar sua primeira playlist
            </Text>
          </View>
        ) : (
          playlists.map(renderPlaylistCard)
        )}
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={openCreateModal}>
        <LinearGradient
          colors={['#007AFF', '#0051D5']}
          style={styles.fabGradient}
        >
          <Ionicons name="add" size={32} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>

      {/* Modal de criação/edição */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <LinearGradient colors={['#1a237e', '#0d47a1']} style={styles.modalHeader}>
            <TouchableOpacity onPress={closeModal} style={styles.modalCloseButton}>
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {editMode ? 'Editar Playlist' : 'Nova Playlist'}
            </Text>
          </LinearGradient>

          <ScrollView style={styles.modalContent}>
            {/* Logo */}
            <TouchableOpacity style={styles.logoPickerContainer} onPress={pickImage}>
              {currentPlaylist.logo ? (
                <Image
                  source={{ uri: currentPlaylist.logo }}
                  style={styles.logoPreview}
                />
              ) : (
                <View
                  style={[
                    styles.logoPlaceholder,
                    { backgroundColor: currentPlaylist.color },
                  ]}
                >
                  <Ionicons name="image-outline" size={40} color="#fff" />
                  <Text style={styles.logoPlaceholderText}>Adicionar Logo</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Nome */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome da Playlist *</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Minha Lista IPTV"
                value={currentPlaylist.name}
                onChangeText={(text) =>
                  setCurrentPlaylist({ ...currentPlaylist, name: text })
                }
              />
            </View>

            {/* Descrição */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Descrição</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Descrição opcional"
                value={currentPlaylist.description}
                onChangeText={(text) =>
                  setCurrentPlaylist({ ...currentPlaylist, description: text })
                }
                multiline
                numberOfLines={3}
              />
            </View>

            {/* Tipo de Servidor */}
            {!editMode && (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Tipo de Servidor *</Text>
                  {renderServerTypeButtons()}
                </View>

                {/* URL do Servidor */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>
                    {currentPlaylist.serverType === 'm3u_url'
                      ? 'URL do M3U *'
                      : 'Servidor *'}
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder={
                      currentPlaylist.serverType === 'm3u_url'
                        ? 'https://exemplo.com/lista.m3u'
                        : 'https://servidor.com'
                    }
                    value={currentPlaylist.serverUrl}
                    onChangeText={(text) =>
                      setCurrentPlaylist({ ...currentPlaylist, serverUrl: text })
                    }
                    autoCapitalize="none"
                  />
                </View>

                {/* Campos Xtream/Stalker */}
                {(currentPlaylist.serverType === 'xtream' ||
                  currentPlaylist.serverType === 'stalker') && (
                  <>
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Usuário *</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Nome de usuário"
                        value={currentPlaylist.username}
                        onChangeText={(text) =>
                          setCurrentPlaylist({ ...currentPlaylist, username: text })
                        }
                        autoCapitalize="none"
                      />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Senha *</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        value={currentPlaylist.password}
                        onChangeText={(text) =>
                          setCurrentPlaylist({ ...currentPlaylist, password: text })
                        }
                        secureTextEntry
                        autoCapitalize="none"
                      />
                    </View>
                  </>
                )}
              </>
            )}

            {/* Cor */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Cor da Playlist</Text>
              <TouchableOpacity
                style={[
                  styles.colorPreview,
                  { backgroundColor: currentPlaylist.color },
                ]}
                onPress={() => setShowColorPicker(!showColorPicker)}
              >
                <Text style={styles.colorPreviewText}>
                  {currentPlaylist.color}
                </Text>
              </TouchableOpacity>
              {showColorPicker && (
                <View style={styles.colorPickerContainer}>
                  <ColorPicker
                    color={currentPlaylist.color}
                    onColorChange={(color) =>
                      setCurrentPlaylist({ ...currentPlaylist, color })
                    }
                    thumbSize={30}
                    sliderSize={30}
                    noSnap={true}
                    row={false}
                  />
                </View>
              )}
            </View>

            {/* Botão Salvar */}
            <TouchableOpacity
              style={styles.saveButton}
              onPress={savePlaylist}
              disabled={loading}
            >
              <LinearGradient
                colors={['#007AFF', '#0051D5']}
                style={styles.saveButtonGradient}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Ionicons name="checkmark-circle" size={24} color="#fff" />
                    <Text style={styles.saveButtonText}>Salvar Playlist</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 15,
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 20,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  playlistCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  playlistHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  playlistLogo: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  playlistLogoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playlistInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  playlistName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  playlistDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  playlistMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playlistMetaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  playlistActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 5,
  },
  activateButton: {
    backgroundColor: '#4CAF50',
    flex: 2,
  },
  editButton: {
    backgroundColor: '#2196F3',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  fabGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  modalHeader: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalCloseButton: {
    marginRight: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  logoPickerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoPreview: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoPlaceholderText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  serverTypeContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  serverTypeButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  serverTypeButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  serverTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
    marginTop: 5,
    textAlign: 'center',
  },
  serverTypeTextActive: {
    color: '#fff',
  },
  colorPreview: {
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorPreviewText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  colorPickerContainer: {
    marginTop: 15,
    height: 250,
  },
  saveButton: {
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 8,
    overflow: 'hidden',
  },
  saveButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    gap: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PlaylistManager;
