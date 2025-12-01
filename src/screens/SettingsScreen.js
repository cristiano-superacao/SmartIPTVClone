import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import { useApp } from '../context/AppContext';

const SettingsScreen = () => {
  const { t, i18n } = useTranslation();
  const { colors, isDark, toggleTheme } = useTheme();
  const { settings, updateSettings, deactivate } = useApp();

  const languages = [
    { code: 'pt-BR', name: 'Português (BR)', flag: '🇧🇷' },
    { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
    { code: 'es-ES', name: 'Español', flag: '🇪🇸' },
  ];

  const changeLanguage = async (languageCode) => {
    await i18n.changeLanguage(languageCode);
    await AsyncStorage.setItem('user_language', languageCode);
    updateSettings({ language: languageCode });
  };

  const handleDeactivate = async () => {
    await deactivate();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    section: {
      marginTop: 20,
      paddingHorizontal: 16,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: 8,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    settingItem: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    settingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    settingIcon: {
      marginRight: 12,
    },
    settingText: {
      flex: 1,
    },
    settingTitle: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text,
    },
    settingDescription: {
      fontSize: 13,
      color: colors.textSecondary,
      marginTop: 2,
    },
    languageOption: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    languageFlag: {
      fontSize: 24,
      marginRight: 12,
    },
    languageName: {
      fontSize: 16,
      color: colors.text,
      flex: 1,
    },
    selectedIndicator: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dangerButton: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 8,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.error,
    },
    dangerText: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.error,
      marginLeft: 12,
    },
  });

  return (
    <ScrollView style={styles.container}>
      {/* Tema */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('theme')}</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Icon
              name={isDark ? 'dark-mode' : 'light-mode'}
              size={24}
              color={colors.primary}
              style={styles.settingIcon}
            />
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>
                {isDark ? t('darkMode') : t('lightMode')}
              </Text>
              <Text style={styles.settingDescription}>
                {t('autoTheme')}
              </Text>
            </View>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.card}
          />
        </View>
      </View>

      {/* Idioma */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('language')}</Text>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={styles.languageOption}
            onPress={() => changeLanguage(lang.code)}
          >
            <Text style={styles.languageFlag}>{lang.flag}</Text>
            <Text style={styles.languageName}>{lang.name}</Text>
            {i18n.language === lang.code && (
              <View style={styles.selectedIndicator}>
                <Icon name="check" size={14} color="#fff" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Reprodução */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reprodução</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Icon
              name="autoplay"
              size={24}
              color={colors.primary}
              style={styles.settingIcon}
            />
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>Reprodução Automática</Text>
              <Text style={styles.settingDescription}>
                Iniciar vídeo automaticamente
              </Text>
            </View>
          </View>
          <Switch
            value={settings.autoPlay !== false}
            onValueChange={(value) => updateSettings({ autoPlay: value })}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.card}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Icon
              name="hd"
              size={24}
              color={colors.primary}
              style={styles.settingIcon}
            />
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>Qualidade Preferida</Text>
              <Text style={styles.settingDescription}>HD quando disponível</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Sobre */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sobre</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Icon
              name="info"
              size={24}
              color={colors.primary}
              style={styles.settingIcon}
            />
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>SmartIPTV Clone</Text>
              <Text style={styles.settingDescription}>Versão 2.0.0</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Zona de Perigo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Zona de Perigo</Text>
        <TouchableOpacity style={styles.dangerButton} onPress={handleDeactivate}>
          <Icon name="delete-forever" size={24} color={colors.error} />
          <Text style={styles.dangerText}>Desativar Lista</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default SettingsScreen;
