import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const handleToggle = (): void => {
    onToggle(todo.id);
  };

  const handleDelete = (): void => {
    onDelete(todo.id);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleToggle} style={styles.todoText}>
        <Text style={todo.completed ? styles.completedText : styles.normalText}>
          {todo.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: colors.white,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  todoText: {
    flex: 1,
  },
  normalText: {
    fontSize: 16,
    color: colors.black,
  },
  completedText: {
    fontSize: 16,
    color: colors.gray,
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    backgroundColor: colors.red,
    padding: 8,
    borderRadius: 5,
  },
  deleteText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default TodoItem;
