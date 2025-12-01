import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import apiService from '../../services/api';
import Toast from 'react-native-toast-message';

const ActivationForm = ({ onActivated }) => {
  const { colors } = useTheme();
  const { activate } = useApp();
  const [m3uUrl, setM3uUrl] = useState('');
  const [activationCode, setActivationCode] = useState('');
  const [loading, setLoading] = useState(false);

  const styles = createStyles(colors);

  const handleActivate = async () => {
    if (!m3uUrl.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Atenção',
        text2: 'Por favor, insira a URL da lista M3U',
      });
      return;
    }

    setLoading(true);
    try {
      const code = activationCode.trim() || 'DEFAULT';
      const result = await apiService.activateList(m3uUrl.trim(), code);

      if (result.success) {
        await activate(code);
        Toast.show({
          type: 'success',
          text1: 'Sucesso!',
          text2: `${result.data.channelCount} canais carregados`,
        });
        onActivated?.();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: result.error,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Não foi possível ativar a lista',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[colors.background, colors.surface]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <Text style={styles.title}>SmartIPTV Clone</Text>
        <Text style={styles.subtitle}>Configure sua lista IPTV</Text>

        <TextInput
          style={styles.input}
          placeholder="Código de ativação (opcional)"
          placeholderTextColor={colors.textSecondary}
          value={activationCode}
          onChangeText={setActivationCode}
          editable={!loading}
        />

        <TextInput
          style={[styles.input, styles.urlInput]}
          placeholder="URL da lista M3U"
          placeholderTextColor={colors.textSecondary}
          value={m3uUrl}
          onChangeText={setM3uUrl}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
          editable={!loading}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleActivate}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Ativar</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.hint}>
          Cole a URL da sua lista M3U para começar a assistir
        </Text>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const createStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 48,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    maxWidth: 500,
    height: 56,
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 20,
    color: colors.text,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  urlInput: {
    marginBottom: 24,
  },
  button: {
    width: '100%',
    maxWidth: 500,
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  hint: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 32,
  },
});

export default ActivationForm;
