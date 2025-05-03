import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useData } from '../contexts/DataContext';
import { Assignment } from '../types';
import { format } from 'date-fns';

export const Assignments: React.FC = () => {
  const { assignments, addAssignment, updateAssignment, deleteAssignment } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Partial<Assignment> | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAssignment) {
      if (editingAssignment.id) {
        updateAssignment(editingAssignment.id, editingAssignment);
      } else {
        addAssignment({
          title: editingAssignment.title || '',
          course: editingAssignment.course || '',
          dueDate: editingAssignment.dueDate || new Date().toISOString(),
          description: editingAssignment.description || '',
          status: editingAssignment.status || 'pending',
          priority: editingAssignment.priority || 'medium',
          attachments: editingAssignment.attachments || [],
        });
      }
      setIsEditing(false);
      setEditingAssignment(null);
    }
  };

  const handleEdit = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      deleteAssignment(id);
    }
  };

  const priorityOptions = ['low', 'medium', 'high'] as const;
  const statusOptions = ['pending', 'in-progress', 'completed', 'late'] as const;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Assignments</h1>
        {!isEditing && (
          <Button
            onClick={() => {
              setEditingAssignment({});
              setIsEditing(true);
            }}
            icon={<Plus size={20} />}
          >
            Add Assignment
          </Button>
        )}
      </div>

      {isEditing && (
        <Card className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {editingAssignment?.id ? 'Edit Assignment' : 'New Assignment'}
              </h2>
              <Button
                variant="text"
                onClick={() => {
                  setIsEditing(false);
                  setEditingAssignment(null);
                }}
                icon={<X size={20} />}
              >
                Cancel
              </Button>
            </div>

            <Input
              label="Title"
              value={editingAssignment?.title || ''}
              onChange={(e) =>
                setEditingAssignment({ ...editingAssignment, title: e.target.value })
              }
              required
            />

            <Input
              label="Course"
              value={editingAssignment?.course || ''}
              onChange={(e) =>
                setEditingAssignment({ ...editingAssignment, course: e.target.value })
              }
              required
            />

            <Input
              label="Due Date"
              type="datetime-local"
              value={editingAssignment?.dueDate ? format(new Date(editingAssignment.dueDate), "yyyy-MM-dd'T'HH:mm") : ''}
              onChange={(e) =>
                setEditingAssignment({
                  ...editingAssignment,
                  dueDate: new Date(e.target.value).toISOString(),
                })
              }
              required
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
                      editingAssignment?.priority === priority
                        ? 'primary'
                        : 'outline'
                    }
                    onClick={() =>
                      setEditingAssignment({
                        ...editingAssignment,
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
                Status
              </label>
              <div className="flex gap-2 flex-wrap">
                {statusOptions.map((status) => (
                  <Button
                    key={status}
                    type="button"
                    variant={
                      editingAssignment?.status === status ? 'primary' : 'outline'
                    }
                    onClick={() =>
                      setEditingAssignment({
                        ...editingAssignment,
                        status,
                      })
                    }
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>

            <Input
              label="Description (Optional)"
              value={editingAssignment?.description || ''}
              onChange={(e) =>
                setEditingAssignment({
                  ...editingAssignment,
                  description: e.target.value,
                })
              }
            />

            <Button type="submit" fullWidth>
              {editingAssignment?.id ? 'Update Assignment' : 'Add Assignment'}
            </Button>
          </form>
        </Card>
      )}

      <div className="grid gap-4">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{assignment.title}</h3>
                <p className="text-neutral-600">{assignment.course}</p>
                <div className="flex gap-2 mt-2">
                  <Badge
                    variant={
                      assignment.priority === 'high'
                        ? 'error'
                        : assignment.priority === 'medium'
                        ? 'warning'
                        : 'neutral'
                    }
                  >
                    {assignment.priority}
                  </Badge>
                  <Badge
                    variant={
                      assignment.status === 'completed'
                        ? 'success'
                        : assignment.status === 'in-progress'
                        ? 'primary'
                        : assignment.status === 'late'
                        ? 'error'
                        : 'warning'
                    }
                  >
                    {assignment.status}
                  </Badge>
                </div>
                <p className="text-sm text-neutral-500 mt-2">
                  Due: {format(new Date(assignment.dueDate), 'PPp')}
                </p>
                {assignment.description && (
                  <p className="mt-2 text-sm text-neutral-600">
                    {assignment.description}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(assignment)}
                  icon={<Edit2 size={16} />}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(assignment.id)}
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