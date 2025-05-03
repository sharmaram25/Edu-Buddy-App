import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { useData } from '../contexts/DataContext';
import { Lecture } from '../types';

export const Lectures: React.FC = () => {
  const { lectures, addLecture, updateLecture, deleteLecture } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [editingLecture, setEditingLecture] = useState<Partial<Lecture> | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLecture) {
      if (editingLecture.id) {
        updateLecture(editingLecture.id, editingLecture);
      } else {
        addLecture({
          title: editingLecture.title || '',
          course: editingLecture.course || '',
          instructor: editingLecture.instructor || '',
          location: editingLecture.location || '',
          startTime: editingLecture.startTime || '',
          endTime: editingLecture.endTime || '',
          daysOfWeek: editingLecture.daysOfWeek || [],
          notes: editingLecture.notes,
          color: editingLecture.color,
        });
      }
      setIsEditing(false);
      setEditingLecture(null);
    }
  };

  const handleEdit = (lecture: Lecture) => {
    setEditingLecture(lecture);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this lecture?')) {
      deleteLecture(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Lectures</h1>
        {!isEditing && (
          <Button
            onClick={() => {
              setEditingLecture({});
              setIsEditing(true);
            }}
            icon={<Plus size={20} />}
          >
            Add Lecture
          </Button>
        )}
      </div>

      {isEditing && (
        <Card className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {editingLecture?.id ? 'Edit Lecture' : 'New Lecture'}
              </h2>
              <Button
                variant="text"
                onClick={() => {
                  setIsEditing(false);
                  setEditingLecture(null);
                }}
                icon={<X size={20} />}
              >
                Cancel
              </Button>
            </div>

            <Input
              label="Title"
              value={editingLecture?.title || ''}
              onChange={(e) =>
                setEditingLecture({ ...editingLecture, title: e.target.value })
              }
              required
            />

            <Input
              label="Course"
              value={editingLecture?.course || ''}
              onChange={(e) =>
                setEditingLecture({ ...editingLecture, course: e.target.value })
              }
              required
            />

            <Input
              label="Instructor"
              value={editingLecture?.instructor || ''}
              onChange={(e) =>
                setEditingLecture({ ...editingLecture, instructor: e.target.value })
              }
              required
            />

            <Input
              label="Location"
              value={editingLecture?.location || ''}
              onChange={(e) =>
                setEditingLecture({ ...editingLecture, location: e.target.value })
              }
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Start Time"
                type="time"
                value={editingLecture?.startTime || ''}
                onChange={(e) =>
                  setEditingLecture({ ...editingLecture, startTime: e.target.value })
                }
                required
              />

              <Input
                label="End Time"
                type="time"
                value={editingLecture?.endTime || ''}
                onChange={(e) =>
                  setEditingLecture({ ...editingLecture, endTime: e.target.value })
                }
                required
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                <Button
                  key={day}
                  type="button"
                  variant={
                    editingLecture?.daysOfWeek?.includes(day)
                      ? 'primary'
                      : 'outline'
                  }
                  onClick={() => {
                    const currentDays = editingLecture?.daysOfWeek || [];
                    const newDays = currentDays.includes(day)
                      ? currentDays.filter((d) => d !== day)
                      : [...currentDays, day];
                    setEditingLecture({ ...editingLecture, daysOfWeek: newDays });
                  }}
                >
                  {day}
                </Button>
              ))}
            </div>

            <Input
              label="Notes (Optional)"
              value={editingLecture?.notes || ''}
              onChange={(e) =>
                setEditingLecture({ ...editingLecture, notes: e.target.value })
              }
            />

            <Button type="submit" fullWidth>
              {editingLecture?.id ? 'Update Lecture' : 'Add Lecture'}
            </Button>
          </form>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {lectures.map((lecture) => (
          <Card key={lecture.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{lecture.title}</h3>
                <p className="text-neutral-600">{lecture.course}</p>
                <p className="text-sm text-neutral-500">
                  {lecture.instructor} • {lecture.location}
                </p>
                <p className="text-sm text-neutral-500 mt-2">
                  {lecture.startTime} - {lecture.endTime}
                </p>
                <div className="flex gap-2 mt-2">
                  {lecture.daysOfWeek.map((day) => (
                    <span
                      key={day}
                      className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded"
                    >
                      {day}
                    </span>
                  ))}
                </div>
                {lecture.notes && (
                  <p className="mt-2 text-sm text-neutral-600">{lecture.notes}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(lecture)}
                  icon={<Edit2 size={16} />}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(lecture.id)}
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