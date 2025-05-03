import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Assignment, Event, Expense, Lecture, Task } from '../types';
import { assignments, events, expenses, lectures, tasks } from '../utils/dummyData';
import { v4 as uuidv4 } from 'uuid';

interface DataContextType {
  lectures: Lecture[];
  assignments: Assignment[];
  events: Event[];
  tasks: Task[];
  expenses: Expense[];
  
  // Lecture CRUD
  addLecture: (lecture: Omit<Lecture, 'id'>) => void;
  updateLecture: (id: string, lecture: Partial<Lecture>) => void;
  deleteLecture: (id: string) => void;
  
  // Assignment CRUD
  addAssignment: (assignment: Omit<Assignment, 'id'>) => void;
  updateAssignment: (id: string, assignment: Partial<Assignment>) => void;
  deleteAssignment: (id: string) => void;
  
  // Event CRUD
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  
  // Task CRUD
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  
  // Expense CRUD
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [lecturesData, setLectures] = useState<Lecture[]>(lectures);
  const [assignmentsData, setAssignments] = useState<Assignment[]>(assignments);
  const [eventsData, setEvents] = useState<Event[]>(events);
  const [tasksData, setTasks] = useState<Task[]>(tasks);
  const [expensesData, setExpenses] = useState<Expense[]>(expenses);

  // Lecture CRUD
  const addLecture = (lecture: Omit<Lecture, 'id'>) => {
    const newLecture = { ...lecture, id: uuidv4() };
    setLectures([...lecturesData, newLecture]);
  };

  const updateLecture = (id: string, lecture: Partial<Lecture>) => {
    setLectures(
      lecturesData.map((l) => (l.id === id ? { ...l, ...lecture } : l))
    );
  };

  const deleteLecture = (id: string) => {
    setLectures(lecturesData.filter((l) => l.id !== id));
  };

  // Assignment CRUD
  const addAssignment = (assignment: Omit<Assignment, 'id'>) => {
    const newAssignment = { ...assignment, id: uuidv4() };
    setAssignments([...assignmentsData, newAssignment]);
  };

  const updateAssignment = (id: string, assignment: Partial<Assignment>) => {
    setAssignments(
      assignmentsData.map((a) => (a.id === id ? { ...a, ...assignment } : a))
    );
  };

  const deleteAssignment = (id: string) => {
    setAssignments(assignmentsData.filter((a) => a.id !== id));
  };

  // Event CRUD
  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = { ...event, id: uuidv4() };
    setEvents([...eventsData, newEvent]);
  };

  const updateEvent = (id: string, event: Partial<Event>) => {
    setEvents(
      eventsData.map((e) => (e.id === id ? { ...e, ...event } : e))
    );
  };

  const deleteEvent = (id: string) => {
    setEvents(eventsData.filter((e) => e.id !== id));
  };

  // Task CRUD
  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask = { ...task, id: uuidv4() };
    setTasks([...tasksData, newTask]);
  };

  const updateTask = (id: string, task: Partial<Task>) => {
    setTasks(
      tasksData.map((t) => (t.id === id ? { ...t, ...task } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasksData.filter((t) => t.id !== id));
  };

  // Expense CRUD
  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = { ...expense, id: uuidv4() };
    setExpenses([...expensesData, newExpense]);
  };

  const updateExpense = (id: string, expense: Partial<Expense>) => {
    setExpenses(
      expensesData.map((e) => (e.id === id ? { ...e, ...expense } : e))
    );
  };

  const deleteExpense = (id: string) => {
    setExpenses(expensesData.filter((e) => e.id !== id));
  };

  const value = {
    lectures: lecturesData,
    assignments: assignmentsData,
    events: eventsData,
    tasks: tasksData,
    expenses: expensesData,
    
    addLecture,
    updateLecture,
    deleteLecture,
    
    addAssignment,
    updateAssignment,
    deleteAssignment,
    
    addEvent,
    updateEvent,
    deleteEvent,
    
    addTask,
    updateTask,
    deleteTask,
    
    addExpense,
    updateExpense,
    deleteExpense,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};