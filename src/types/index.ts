export interface User {
  id: string;
  name: string;
  email: string;
  uniqueId: string;
  avatar?: string;
}

export interface Lecture {
  id: string;
  title: string;
  course: string;
  instructor: string;
  location: string;
  startTime: string;
  endTime: string;
  daysOfWeek: string[];
  notes?: string;
  color?: string;
}

export interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'late';
  priority: 'low' | 'medium' | 'high';
  attachments?: string[];
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  category: 'academic' | 'extracurricular' | 'personal' | 'other';
  color?: string;
  reminder?: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category?: string;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: 'books' | 'food' | 'transportation' | 'housing' | 'entertainment' | 'other';
  description?: string;
  recurring?: boolean;
}

export type TabType = 'lectures' | 'assignments' | 'events' | 'tasks' | 'expenses' | 'dashboard';