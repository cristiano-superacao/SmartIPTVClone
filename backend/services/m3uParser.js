/**
 * Serviço para parsear arquivos M3U
 */
class M3UParser {
  /**
   * Parseia conteúdo M3U
   */
  parse(m3uContent) {
    const lines = m3uContent.split('\n');
    const channels = [];
    let currentChannel = {};
    let channelIndex = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith('#EXTINF:')) {
        currentChannel = this.parseExtinf(line, channelIndex++);
      } else if (line && !line.startsWith('#')) {
        // URL do stream
        if (currentChannel.name) {
          currentChannel.url = line;
          channels.push({ ...currentChannel });
          currentChannel = {};
        }
      }
    }

    return channels;
  }

  /**
   * Parseia linha EXTINF
   */
  parseExtinf(line, index) {
    const channel = {
      id: `channel_${Date.now()}_${index}`,
      tvgId: this.extractAttribute(line, 'tvg-id'),
      tvgName: this.extractAttribute(line, 'tvg-name'),
      logo: this.extractAttribute(line, 'tvg-logo'),
      group: this.extractAttribute(line, 'group-title') || 'Sem categoria',
      name: this.extractChannelName(line) || 'Canal sem nome',
    };

    return channel;
  }

  /**
   * Extrai atributo da linha EXTINF
   */
  extractAttribute(line, attribute) {
    const regex = new RegExp(`${attribute}="([^"]*)"`, 'i');
    const match = line.match(regex);
    return match ? match[1] : '';
  }

  /**
   * Extrai nome do canal (após a última vírgula)
   */
  extractChannelName(line) {
    const match = line.match(/,(.+)$/);
    return match ? match[1].trim() : '';
  }

  /**
   * Valida conteúdo M3U
   */
  validate(m3uContent) {
    if (!m3uContent || typeof m3uContent !== 'string') {
      return { valid: false, error: 'Conteúdo M3U inválido' };
    }

    if (!m3uContent.includes('#EXTINF')) {
      return { valid: false, error: 'Formato M3U inválido' };
    }

    const channels = this.parse(m3uContent);
    if (channels.length === 0) {
      return { valid: false, error: 'Nenhum canal encontrado' };
    }

    return { valid: true, channels };
  }
}

module.exports = new M3UParser();
