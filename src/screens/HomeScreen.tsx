import React, { FC, useState } from 'react';
import {
  View,
  Text,
  Alert,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../styles/styles';
import Button from '../components/Button';
import AddTodoDrawer from '../components/AddTodoDrawer';
import { Todo } from '../types';

const HomeScreen: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const handleAddTodo = (text: string): void => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos([...todos, newTodo]);
  };

  const handleDeleteAllTodos = (): void => {
    Alert.alert(
      'Delete All Todos',
      'Are you sure you want to delete all todos?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => setTodos([]) },
      ],
    );
  };

  const toggleTodo = (id: string): void => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: string): void => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView style={styles.content}>
        <Text style={styles.welcomeTitle}>Welcome to TodoList!</Text>

        <Button title="Add Todo" onPress={() => setIsDrawerVisible(true)} />

        <Button
          title="Delete All"
          onPress={handleDeleteAllTodos}
          variant="danger"
          disabled={todos.length === 0}
        />

        <View style={styles.todosContainer}>
          <Text style={globalStyles.title}>Todos ({todos.length})</Text>
          {todos.length === 0 ? (
            <Text style={styles.emptyText}>No todos yet. Add one above!</Text>
          ) : (
            todos.map(todo => (
              <View key={todo.id} style={styles.todoItem}>
                <View style={styles.todoContent}>
                  <Text
                    style={[
                      styles.todoText,
                      todo.completed && styles.completedText,
                    ]}
                  >
                    {todo.text}
                  </Text>
                </View>
                <View style={styles.todoActions}>
                  <Button
                    title={todo.completed ? 'Undo' : 'Done'}
                    onPress={() => toggleTodo(todo.id)}
                    variant={todo.completed ? 'secondary' : 'primary'}
                  />
                  <Button
                    title="Delete"
                    onPress={() => deleteTodo(todo.id)}
                    variant="danger"
                  />
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <AddTodoDrawer
        visible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
        onAddTodo={handleAddTodo}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  todosContainer: {
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#8E8E93',
    fontSize: 16,
    marginTop: 20,
    fontStyle: 'italic',
  },
  todoItem: {
    backgroundColor: '#F2F2F7',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todoContent: {
    flex: 1,
    marginRight: 10,
  },
  todoText: {
    fontSize: 16,
    color: '#000000',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#8E8E93',
  },
  todoActions: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default HomeScreen;
