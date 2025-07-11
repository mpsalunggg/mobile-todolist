import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Dimensions,
} from 'react-native';
import { colors } from '../styles/colors';
import Input from './Input';
import Button from './Button';

interface AddTodoDrawerProps {
  visible: boolean;
  onClose: () => void;
  onAddTodo: (text: string) => void;
}

const { height: screenHeight } = Dimensions.get('window');

const AddTodoDrawer: React.FC<AddTodoDrawerProps> = ({
  visible,
  onClose,
  onAddTodo,
}) => {
  const [todoText, setTodoText] = useState('');
  const [slideAnim] = useState(new Animated.Value(screenHeight));

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const handleAddTodo = () => {
    if (todoText.trim()) {
      onAddTodo(todoText.trim());
      setTodoText('');
      onClose();
    }
  };

  const handleCancel = () => {
    setTodoText('');
    onClose();
  };

  const handleBackdropPress = () => {
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          onPress={handleBackdropPress}
        />

        <Animated.View
          style={[
            styles.drawerContainer,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
          >
            <View style={styles.handle} />
            <View style={styles.header}>
              <Text style={styles.title}>Add New Todo</Text>
            </View>
            <View style={styles.inputSection}>
              <Input
                value={todoText}
                onChangeText={setTodoText}
                placeholder="What needs to be done?"
                autoFocus={true}
                returnKeyType="done"
                onSubmitEditing={handleAddTodo}
                multiline={true}
                numberOfLines={3}
                style={styles.textInput}
              />
              <Text style={styles.helperText}>
                Press Enter or tap "Add" to save your todo
              </Text>
            </View>

            <View style={styles.actionButtons}>
              <Button
                title="Add Todo"
                onPress={handleAddTodo}
                disabled={!todoText.trim()}
                style={styles.gridButton}
              />
              <Button
                title="Cancel"
                onPress={handleCancel}
                variant="secondary"
                style={styles.gridButton}
              />
            </View>
          </KeyboardAvoidingView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdrop: {
    flex: 1,
  },
  drawerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 350,
    maxHeight: screenHeight * 0.8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  keyboardView: {
    flex: 1,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.gray,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  cancelButton: {
    fontSize: 16,
    color: colors.gray,
    fontWeight: '500',
  },
  addButton: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: 'bold',
  },
  disabledButton: {
    color: colors.gray,
    opacity: 0.5,
  },
  inputSection: {
    flex: 1,
    padding: 20,
  },
  textInput: {
    minHeight: 100,
    maxHeight: 150,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
  },
  helperText: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 10,
    textAlign: 'center',
  },
  actionButtons: {
    padding: 20,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
  gridButton: {
    flex: 1,
    minWidth: '45%',
    maxWidth: '48%',
  },
});

export default AddTodoDrawer;
