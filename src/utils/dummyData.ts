import { Assignment, Event, Expense, Lecture, Task, User } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const currentUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@student.edu',
  avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
};

export const lectures: Lecture[] = [
  {
    id: uuidv4(),
    title: 'Introduction to Computer Science',
    course: 'CS101',
    instructor: 'Dr. Smith',
    location: 'Building A, Room 101',
    startTime: '09:00',
    endTime: '10:30',
    daysOfWeek: ['Monday', 'Wednesday'],
    color: '#4F46E5',
  },
  {
    id: uuidv4(),
    title: 'Calculus I',
    course: 'MATH201',
    instructor: 'Prof. Johnson',
    location: 'Math Building, Room 203',
    startTime: '11:00',
    endTime: '12:30',
    daysOfWeek: ['Tuesday', 'Thursday'],
    color: '#0D9488',
  },
  {
    id: uuidv4(),
    title: 'Introduction to Psychology',
    course: 'PSYCH101',
    instructor: 'Dr. Williams',
    location: 'Social Sciences, Room 305',
    startTime: '14:00',
    endTime: '15:30',
    daysOfWeek: ['Monday', 'Wednesday', 'Friday'],
    color: '#F59E0B',
  },
];

export const assignments: Assignment[] = [
  {
    id: uuidv4(),
    title: 'Algorithm Analysis',
    course: 'CS101',
    dueDate: '2025-06-15T23:59:00',
    description: 'Analyze the time and space complexity of given algorithms',
    status: 'pending',
    priority: 'high',
  },
  {
    id: uuidv4(),
    title: 'Calculus Problem Set',
    course: 'MATH201',
    dueDate: '2025-06-10T23:59:00',
    description: 'Solve problems 1-20 in Chapter 3',
    status: 'in-progress',
    priority: 'medium',
  },
  {
    id: uuidv4(),
    title: 'Psychology Research Paper',
    course: 'PSYCH101',
    dueDate: '2025-06-20T23:59:00',
    description: 'Write a 5-page research paper on a topic of your choice',
    status: 'not-started',
    priority: 'low',
  },
];

export const events: Event[] = [
  {
    id: uuidv4(),
    title: 'Computer Science Department Social',
    description: 'Network with professors and other CS students',
    location: 'Student Union, Room 302',
    startDate: '2025-06-12T18:00:00',
    endDate: '2025-06-12T20:00:00',
    category: 'academic',
    reminder: true,
  },
  {
    id: uuidv4(),
    title: 'Campus Career Fair',
    description: 'Meet with potential employers and explore internship opportunities',
    location: 'Main Campus, Hall B',
    startDate: '2025-06-18T10:00:00',
    endDate: '2025-06-18T15:00:00',
    category: 'academic',
    reminder: true,
  },
  {
    id: uuidv4(),
    title: 'Study Group - Calculus',
    description: 'Prepare for the upcoming exam',
    location: 'Library, Study Room 4',
    startDate: '2025-06-08T16:00:00',
    endDate: '2025-06-08T18:00:00',
    category: 'academic',
    reminder: true,
  },
];

export const tasks: Task[] = [
  {
    id: uuidv4(),
    title: 'Review lecture notes',
    description: 'Go through CS101 lecture notes from this week',
    dueDate: '2025-06-07T23:59:00',
    completed: false,
    priority: 'medium',
    category: 'study',
  },
  {
    id: uuidv4(),
    title: 'Email professor about assignment extension',
    completed: false,
    priority: 'high',
    category: 'admin',
  },
  {
    id: uuidv4(),
    title: 'Start research for psychology paper',
    description: 'Find at least 5 academic sources',
    dueDate: '2025-06-09T23:59:00',
    completed: false,
    priority: 'medium',
    category: 'research',
  },
  {
    id: uuidv4(),
    title: 'Organize study materials',
    completed: true,
    priority: 'low',
    category: 'organization',
  },
];

export const expenses: Expense[] = [
  {
    id: uuidv4(),
    title: 'Textbooks for Spring Semester',
    amount: 245.67,
    date: '2025-05-30',
    category: 'books',
    description: 'CS101, MATH201, and PSYCH101 textbooks',
  },
  {
    id: uuidv4(),
    title: 'Lunch at Campus Café',
    amount: 12.99,
    date: '2025-06-02',
    category: 'food',
  },
  {
    id: uuidv4(),
    title: 'Bus Pass',
    amount: 75.00,
    date: '2025-06-01',
    category: 'transportation',
    description: 'Monthly unlimited transit pass',
    recurring: true,
  },
  {
    id: uuidv4(),
    title: 'Printer Paper',
    amount: 8.99,
    date: '2025-06-03',
    category: 'other',
    description: 'For printing assignments',
  },
];