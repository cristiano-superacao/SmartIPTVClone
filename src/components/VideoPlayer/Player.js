import React, { memo } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';

const VideoPlayer = memo(() => {
  const { colors } = useTheme();
  const {
    currentChannel,
    playerState,
    videoRef,
    onLoad,
    onProgress,
    onBuffer,
    onError,
    onEnd,
  } = useApp();

  const styles = createStyles(colors);

  if (!currentChannel) {
    return (
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>
          Selecione um canal para assistir
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: currentChannel.url }}
        style={styles.video}
        controls={true}
        resizeMode="contain"
        onLoad={onLoad}
        onProgress={onProgress}
        onBuffer={onBuffer}
        onError={onError}
        onEnd={onEnd}
        paused={playerState === 'paused'}
        bufferConfig={{
          minBufferMs: 15000,
          maxBufferMs: 50000,
          bufferForPlaybackMs: 2500,
          bufferForPlaybackAfterRebufferMs: 5000,
        }}
      />
      
      {playerState === 'loading' && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.channelName} numberOfLines={1}>
          {currentChannel.name}
        </Text>
        {currentChannel.group && (
          <Text style={styles.channelGroup} numberOfLines={1}>
            {currentChannel.group}
          </Text>
        )}
      </View>
    </View>
  );
});

const createStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  video: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  placeholderText: {
    color: colors.textSecondary,
    fontSize: 18,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  info: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 16,
  },
  channelName: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  channelGroup: {
    color: '#CCC',
    fontSize: 14,
    marginTop: 4,
  },
});

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;
