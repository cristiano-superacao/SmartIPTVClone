import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Serviço de armazenamento local
 */
class StorageService {
  /**
   * Salva item no storage
   */
  async setItem(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (error) {
      console.error('Erro ao salvar no storage:', error);
      return false;
    }
  }

  /**
   * Busca item do storage
   */
  async getItem(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Erro ao buscar do storage:', error);
      return null;
    }
  }

  /**
   * Remove item do storage
   */
  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Erro ao remover do storage:', error);
      return false;
    }
  }

  /**
   * Limpa todo o storage
   */
  async clear() {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Erro ao limpar storage:', error);
      return false;
    }
  }

  /**
   * Busca múltiplos items
   */
  async multiGet(keys) {
    try {
      const values = await AsyncStorage.multiGet(keys);
      return values.reduce((result, [key, value]) => {
        result[key] = value ? JSON.parse(value) : null;
        return result;
      }, {});
    } catch (error) {
      console.error('Erro ao buscar múltiplos items:', error);
      return {};
    }
  }

  /**
   * Salva múltiplos items
   */
  async multiSet(keyValuePairs) {
    try {
      const pairs = keyValuePairs.map(([key, value]) => [
        key,
        JSON.stringify(value),
      ]);
      await AsyncStorage.multiSet(pairs);
      return true;
    } catch (error) {
      console.error('Erro ao salvar múltiplos items:', error);
      return false;
    }
  }

  /**
   * Remove múltiplos items
   */
  async multiRemove(keys) {
    try {
      await AsyncStorage.multiRemove(keys);
      return true;
    } catch (error) {
      console.error('Erro ao remover múltiplos items:', error);
      return false;
    }
  }

  /**
   * Lista todas as chaves
   */
  async getAllKeys() {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Erro ao listar chaves:', error);
      return [];
    }
  }
}

export default new StorageService();
