import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, Book, CheckSquare, Calendar, ListTodo, DollarSign } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useData } from '../contexts/DataContext';
import { Link } from 'react-router-dom';

export const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const { lectures, assignments, events, tasks, expenses } = useData();

  const searchResults = React.useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return null;

    return {
      lectures: lectures.filter(l => 
        l.title.toLowerCase().includes(q) || 
        l.course.toLowerCase().includes(q) ||
        l.instructor.toLowerCase().includes(q)
      ),
      assignments: assignments.filter(a => 
        a.title.toLowerCase().includes(q) || 
        a.course.toLowerCase().includes(q) ||
        a.description?.toLowerCase().includes(q)
      ),
      events: events.filter(e => 
        e.title.toLowerCase().includes(q) || 
        e.description?.toLowerCase().includes(q) ||
        e.location?.toLowerCase().includes(q)
      ),
      tasks: tasks.filter(t => 
        t.title.toLowerCase().includes(q) || 
        t.description?.toLowerCase().includes(q)
      ),
      expenses: expenses.filter(e => 
        e.title.toLowerCase().includes(q) || 
        e.description?.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q)
      ),
    };
  }, [query, lectures, assignments, events, tasks, expenses]);

  return (
    <div className="space-y-6">
      <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 py-4">
        <Input
          placeholder="Search for anything..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          startIcon={<SearchIcon size={20} />}
          className="max-w-2xl mx-auto"
        />
      </div>

      {query && searchResults && (
        <div className="space-y-8">
          {/* Lectures */}
          {searchResults.lectures.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Book className="text-primary-600" size={24} />
                <h2 className="text-lg font-semibold">Lectures</h2>
              </div>
              <div className="grid gap-4">
                {searchResults.lectures.map(lecture => (
                  <Link key={lecture.id} to="/lectures">
                    <Card className="p-4 hover:bg-neutral-50 transition-colors">
                      <h3 className="font-medium">{lecture.title}</h3>
                      <p className="text-sm text-neutral-600">{lecture.course}</p>
                      <p className="text-sm text-neutral-500">{lecture.instructor}</p>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Assignments */}
          {searchResults.assignments.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CheckSquare className="text-primary-600" size={24} />
                <h2 className="text-lg font-semibold">Assignments</h2>
              </div>
              <div className="grid gap-4">
                {searchResults.assignments.map(assignment => (
                  <Link key={assignment.id} to="/assignments">
                    <Card className="p-4 hover:bg-neutral-50 transition-colors">
                      <h3 className="font-medium">{assignment.title}</h3>
                      <p className="text-sm text-neutral-600">{assignment.course}</p>
                      {assignment.description && (
                        <p className="text-sm text-neutral-500">{assignment.description}</p>
                      )}
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Events */}
          {searchResults.events.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="text-primary-600" size={24} />
                <h2 className="text-lg font-semibold">Events</h2>
              </div>
              <div className="grid gap-4">
                {searchResults.events.map(event => (
                  <Link key={event.id} to="/events">
                    <Card className="p-4 hover:bg-neutral-50 transition-colors">
                      <h3 className="font-medium">{event.title}</h3>
                      {event.location && (
                        <p className="text-sm text-neutral-600">{event.location}</p>
                      )}
                      {event.description && (
                        <p className="text-sm text-neutral-500">{event.description}</p>
                      )}
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Tasks */}
          {searchResults.tasks.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ListTodo className="text-primary-600" size={24} />
                <h2 className="text-lg font-semibold">Tasks</h2>
              </div>
              <div className="grid gap-4">
                {searchResults.tasks.map(task => (
                  <Link key={task.id} to="/tasks">
                    <Card className="p-4 hover:bg-neutral-50 transition-colors">
                      <h3 className="font-medium">{task.title}</h3>
                      {task.description && (
                        <p className="text-sm text-neutral-500">{task.description}</p>
                      )}
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Expenses */}
          {searchResults.expenses.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="text-primary-600" size={24} />
                <h2 className="text-lg font-semibold">Expenses</h2>
              </div>
              <div className="grid gap-4">
                {searchResults.expenses.map(expense => (
                  <Link key={expense.id} to="/expenses">
                    <Card className="p-4 hover:bg-neutral-50 transition-colors">
                      <h3 className="font-medium">{expense.title}</h3>
                      <p className="text-sm text-neutral-600">${expense.amount.toFixed(2)}</p>
                      {expense.description && (
                        <p className="text-sm text-neutral-500">{expense.description}</p>
                      )}
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {Object.values(searchResults).every(arr => arr.length === 0) && (
            <div className="text-center py-8 text-neutral-600">
              No results found for "{query}"
            </div>
          )}
        </div>
      )}

      {!query && (
        <div className="text-center py-8 text-neutral-600">
          Start typing to search across all your content
        </div>
      )}
    </div>
  );
};