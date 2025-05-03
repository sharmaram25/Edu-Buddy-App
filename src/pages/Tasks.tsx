import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, X, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useData } from '../contexts/DataContext';
import { Task } from '../types';
import { format } from 'date-fns';

export const Tasks: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState<Partial<Task> | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask) {
      if (editingTask.id) {
        updateTask(editingTask.id, editingTask);
      } else {
        addTask({
          title: editingTask.title || '',
          description: editingTask.description,
          dueDate: editingTask.dueDate,
          completed: editingTask.completed || false,
          priority: editingTask.priority || 'medium',
          category: editingTask.category,
        });
      }
      setIsEditing(false);
      setEditingTask(null);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
    }
  };

  const toggleComplete = (task: Task) => {
    updateTask(task.id, { ...task, completed: !task.completed });
  };

  const priorityOptions = ['low', 'medium', 'high'] as const;
  const categoryOptions = ['study', 'admin', 'research', 'organization'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tasks</h1>
        {!isEditing && (
          <Button
            onClick={() => {
              setEditingTask({});
              setIsEditing(true);
            }}
            icon={<Plus size={20} />}
          >
            Add Task
          </Button>
        )}
      </div>

      {isEditing && (
        <Card className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {editingTask?.id ? 'Edit Task' : 'New Task'}
              </h2>
              <Button
                variant="text"
                onClick={() => {
                  setIsEditing(false);
                  setEditingTask(null);
                }}
                icon={<X size={20} />}
              >
                Cancel
              </Button>
            </div>

            <Input
              label="Title"
              value={editingTask?.title || ''}
              onChange={(e) =>
                setEditingTask({ ...editingTask, title: e.target.value })
              }
              required
            />

            <Input
              label="Due Date"
              type="datetime-local"
              value={
                editingTask?.dueDate
                  ? format(new Date(editingTask.dueDate), "yyyy-MM-dd'T'HH:mm")
                  : ''
              }
              onChange={(e) =>
                setEditingTask({
                  ...editingTask,
                  dueDate: new Date(e.target.value).toISOString(),
                })
              }
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">
                Priority
              </label>
              <div className="flex gap-2">
                {priorityOptions.map((priority) => (
                  <Button
                    key={priority}
                    type="button"
                    variant={
                      editingTask?.priority === priority ? 'primary' : 'outline'
                    }
                    onClick={() =>
                      setEditingTask({
                        ...editingTask,
                        priority,
                      })
                    }
                  >
                    {priority}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">
                Category
              </label>
              <div className="flex gap-2 flex-wrap">
                {categoryOptions.map((category) => (
                  <Button
                    key={category}
                    type="button"
                    variant={
                      editingTask?.category === category ? 'primary' : 'outline'
                    }
                    onClick={() =>
                      setEditingTask({
                        ...editingTask,
                        category,
                      })
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <Input
              label="Description (Optional)"
              value={editingTask?.description || ''}
              onChange={(e) =>
                setEditingTask({
                  ...editingTask,
                  description: e.target.value,
                })
              }
            />

            <Button type="submit" fullWidth>
              {editingTask?.id ? 'Update Task' : 'Add Task'}
            </Button>
          </form>
        </Card>
      )}

      <div className="grid gap-4">
        {tasks.map((task) => (
          <Card
            key={task.id}
            className={`p-4 ${
              task.completed ? 'bg-neutral-50' : 'bg-white'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleComplete(task)}
                  className={`mt-1 rounded-full p-1 transition-colors ${
                    task.completed
                      ? 'text-green-600 bg-green-100'
                      : 'text-neutral-400 hover:text-neutral-600'
                  }`}
                >
                  <CheckCircle size={20} />
                </button>
                <div>
                  <h3
                    className={`font-semibold text-lg ${
                      task.completed ? 'line-through text-neutral-500' : ''
                    }`}
                  >
                    {task.title}
                  </h3>
                  <div className="flex gap-2 mt-2">
                    <Badge
                      variant={
                        task.priority === 'high'
                          ? 'error'
                          : task.priority === 'medium'
                          ? 'warning'
                          : 'neutral'
                      }
                    >
                      {task.priority}
                    </Badge>
                    {task.category && (
                      <Badge variant="secondary">{task.category}</Badge>
                    )}
                  </div>
                  {task.dueDate && (
                    <p className="text-sm text-neutral-500 mt-2">
                      Due: {format(new Date(task.dueDate), 'PPp')}
                    </p>
                  )}
                  {task.description && (
                    <p className="mt-2 text-sm text-neutral-600">
                      {task.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(task)}
                  icon={<Edit2 size={16} />}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(task.id)}
                  icon={<Trash2 size={16} />}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};