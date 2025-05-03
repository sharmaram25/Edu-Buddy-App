import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Clock, Plus, TrendingUp, Book, Calendar, DollarSign, ArrowUp, ArrowDown } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';

export const Dashboard: React.FC = () => {
  const { lectures, assignments, events, tasks, expenses } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Calculate upcoming deadlines (assignments due within 7 days)
  const upcomingDeadlines = assignments
    .filter(a => {
      const dueDate = new Date(a.dueDate);
      const now = new Date();
      const diffDays = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 7;
    })
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  
  // Calculate upcoming events (within next 7 days)
  const upcomingEvents = events
    .filter(e => {
      const eventDate = new Date(e.startDate);
      const now = new Date();
      const diffDays = Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 7;
    })
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  
  // Calculate tasks status
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = tasks.filter(t => !t.completed).length;
  const completionRate = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;
  
  // Calculate expenses statistics
  const thisMonth = new Date().getMonth();
  const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
  const thisYear = new Date().getFullYear();
  const lastYear = thisMonth === 0 ? thisYear - 1 : thisYear;

  const thisMonthExpenses = expenses
    .filter(e => {
      const expenseDate = new Date(e.date);
      return expenseDate.getMonth() === thisMonth && expenseDate.getFullYear() === thisYear;
    })
    .reduce((sum, expense) => sum + expense.amount, 0);

  const lastMonthExpenses = expenses
    .filter(e => {
      const expenseDate = new Date(e.date);
      return expenseDate.getMonth() === lastMonth && expenseDate.getFullYear() === lastYear;
    })
    .reduce((sum, expense) => sum + expense.amount, 0);

  const expenseChange = lastMonthExpenses === 0 
    ? 100 
    : ((thisMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100;

  // Group expenses by category
  const expensesByCategory = expenses
    .filter(e => {
      const expenseDate = new Date(e.date);
      return expenseDate.getMonth() === thisMonth && expenseDate.getFullYear() === thisYear;
    })
    .reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 pb-8"
    >
      {/* Welcome Section */}
      <motion.div variants={item} className="mb-6">
        <h1 className="text-2xl font-bold">Welcome back, {user?.name.split(' ')[0]}</h1>
        <p className="text-neutral-600">Here's an overview of your academic life</p>
      </motion.div>

      {/* Quick Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex flex-col h-full">
            <div className="text-neutral-600 text-sm mb-2">Tasks</div>
            <div className="text-2xl font-bold">{completedTasks}/{tasks.length}</div>
            <div className="mt-2 bg-neutral-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-primary-600 h-full rounded-full"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex flex-col h-full">
            <div className="text-neutral-600 text-sm mb-2">Monthly Expenses</div>
            <div className="text-2xl font-bold">₹{thisMonthExpenses.toFixed(2)}</div>
            <div className="mt-2 flex items-center gap-1 text-xs">
              {expenseChange > 0 ? (
                <>
                  <ArrowUp className="text-error-500" size={12} />
                  <span className="text-error-500">+{expenseChange.toFixed(1)}%</span>
                </>
              ) : (
                <>
                  <ArrowDown className="text-success-500" size={12} />
                  <span className="text-success-500">{expenseChange.toFixed(1)}%</span>
                </>
              )}
              <span className="text-neutral-500">vs last month</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex flex-col h-full">
            <div className="text-neutral-600 text-sm mb-2">Lectures</div>
            <div className="text-2xl font-bold">{lectures.length}</div>
            <div className="mt-auto text-xs text-neutral-500">
              <Book size={12} className="inline mr-1" />
              Active courses
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex flex-col h-full">
            <div className="text-neutral-600 text-sm mb-2">Events</div>
            <div className="text-2xl font-bold">{upcomingEvents.length}</div>
            <div className="mt-auto text-xs text-neutral-500">
              <Calendar size={12} className="inline mr-1" />
              Upcoming
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Expense Categories */}
      <motion.div variants={item} className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Expense Breakdown</h2>
          <Button 
            variant="text" 
            size="sm"
            onClick={() => navigate('/expenses')}
          >
            View all
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {Object.entries(expensesByCategory).map(([category, amount]) => (
            <Card key={category} className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="text-primary-600" size={16} />
                <span className="capitalize">{category}</span>
              </div>
              <div className="text-lg font-semibold">₹{amount.toFixed(2)}</div>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Upcoming Events */}
      <motion.div variants={item} className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Upcoming Events</h2>
          <Button 
            variant="text" 
            size="sm"
            onClick={() => navigate('/events')}
          >
            View all
          </Button>
        </div>

        {upcomingEvents.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {upcomingEvents.slice(0, 4).map((event) => (
              <Card key={event.id} className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{event.title}</h3>
                    {event.location && (
                      <p className="text-sm text-neutral-600">{event.location}</p>
                    )}
                    <div className="mt-2">
                      <Badge 
                        variant={
                          event.category === 'academic' ? 'primary' : 
                          event.category === 'extracurricular' ? 'secondary' : 
                          event.category === 'personal' ? 'accent' : 'neutral'
                        }
                      >
                        {event.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-neutral-600">
                      <Clock size={14} className="inline-block mr-1" />
                      {formatDistanceToNow(new Date(event.startDate), { addSuffix: true })}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-5 text-center">
            <p className="text-neutral-600">No upcoming events</p>
            <Button 
              variant="primary" 
              size="sm" 
              className="mt-3"
              icon={<Plus size={16} />}
              onClick={() => navigate('/events')}
            >
              Add Event
            </Button>
          </Card>
        )}
      </motion.div>

      {/* Upcoming Deadlines */}
      <motion.div variants={item} className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Upcoming Deadlines</h2>
          <Button 
            variant="text" 
            size="sm"
            onClick={() => navigate('/assignments')}
          >
            View all
          </Button>
        </div>

        {upcomingDeadlines.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {upcomingDeadlines.slice(0, 4).map((assignment) => (
              <Card key={assignment.id} className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{assignment.title}</h3>
                    <p className="text-sm text-neutral-600">{assignment.course}</p>
                    <div className="mt-2 flex gap-2">
                      <Badge 
                        variant={
                          assignment.priority === 'high' ? 'error' : 
                          assignment.priority === 'medium' ? 'warning' : 'neutral'
                        }
                      >
                        {assignment.priority}
                      </Badge>
                      <Badge 
                        variant={
                          assignment.status === 'pending' ? 'accent' : 
                          assignment.status === 'in-progress' ? 'primary' : 
                          assignment.status === 'completed' ? 'success' : 'error'
                        }
                      >
                        {assignment.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-neutral-600">
                      <Clock size={14} className="inline-block mr-1" />
                      {formatDistanceToNow(new Date(assignment.dueDate), { addSuffix: true })}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-5 text-center">
            <p className="text-neutral-600">No upcoming deadlines</p>
            <Button 
              variant="primary" 
              size="sm" 
              className="mt-3"
              icon={<Plus size={16} />}
              onClick={() => navigate('/assignments')}
            >
              Add Assignment
            </Button>
          </Card>
        )}
      </motion.div>
    </motion.div>
  );
};