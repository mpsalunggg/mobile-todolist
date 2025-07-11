import React, { FC } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { globalStyles } from '../styles/styles';
import { colors } from '../styles/colors';
import { ButtonVariant } from '../types';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryButton;
      case 'danger':
        return styles.dangerButton;
      default:
        return globalStyles.button;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryText;
      default:
        return globalStyles.buttonText;
    }
  };

  return (
    <TouchableOpacity
      style={[
        getButtonStyle(),
        disabled && styles.disabledButton,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          getTextStyle(),
          disabled && styles.disabledText,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  secondaryButton: {
    backgroundColor: colors.lightGray,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  dangerButton: {
    backgroundColor: colors.red,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  secondaryText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: colors.gray,
    opacity: 0.5,
  },
  disabledText: {
    color: colors.white,
  },
});

export default Button;
