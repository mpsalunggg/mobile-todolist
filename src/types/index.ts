export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export type ButtonVariant = 'primary' | 'secondary' | 'danger';
