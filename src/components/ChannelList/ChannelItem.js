import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../context/ThemeContext';
import { getRandomColor, truncateText } from '../../utils/helpers';
import { createStyles } from './styles';
import { isLargeDevice } from '../../utils/helpers';

const ChannelItem = memo(({ item, isActive, onPress, onToggleFavorite, isFavorite }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors, isLargeDevice());
  const bgColor = getRandomColor(item.name);

  return (
    <TouchableOpacity
      style={[styles.item, isActive && styles.itemActive]}
      onPress={() => onPress(item)}
      activeOpacity={0.7}
    >
      {item.logo ? (
        <FastImage
          source={{ uri: item.logo, priority: FastImage.priority.normal }}
          style={[styles.icon, { backgroundColor: bgColor }]}
          resizeMode={FastImage.resizeMode.cover}
        />
      ) : (
        <View style={[styles.icon, { backgroundColor: bgColor }]}>
          <Text style={styles.iconText}>
            {item.name.charAt(0).toUpperCase()}
          </Text>
        </View>
      )}
      
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        {item.group && (
          <Text style={styles.group} numberOfLines={1}>
            {item.group}
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => onToggleFavorite(item)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Icon
          name={isFavorite ? 'favorite' : 'favorite-border'}
          size={24}
          color={isFavorite ? colors.error : colors.textSecondary}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
});

ChannelItem.displayName = 'ChannelItem';

export default ChannelItem;
