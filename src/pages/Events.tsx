import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, X, MapPin } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useData } from '../contexts/DataContext';
import { Event } from '../types';
import { format } from 'date-fns';

export const Events: React.FC = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Partial<Event> | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      if (editingEvent.id) {
        updateEvent(editingEvent.id, editingEvent);
      } else {
        addEvent({
          title: editingEvent.title || '',
          description: editingEvent.description,
          location: editingEvent.location,
          startDate: editingEvent.startDate || new Date().toISOString(),
          endDate: editingEvent.endDate,
          category: editingEvent.category || 'other',
          color: editingEvent.color,
          reminder: editingEvent.reminder,
        });
      }
      setIsEditing(false);
      setEditingEvent(null);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(id);
    }
  };

  const categoryOptions = [
    'academic',
    'extracurricular',
    'personal',
    'other',
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Events</h1>
        {!isEditing && (
          <Button
            onClick={() => {
              setEditingEvent({});
              setIsEditing(true);
            }}
            icon={<Plus size={20} />}
          >
            Add Event
          </Button>
        )}
      </div>

      {isEditing && (
        <Card className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {editingEvent?.id ? 'Edit Event' : 'New Event'}
              </h2>
              <Button
                variant="text"
                onClick={() => {
                  setIsEditing(false);
                  setEditingEvent(null);
                }}
                icon={<X size={20} />}
              >
                Cancel
              </Button>
            </div>

            <Input
              label="Title"
              value={editingEvent?.title || ''}
              onChange={(e) =>
                setEditingEvent({ ...editingEvent, title: e.target.value })
              }
              required
            />

            <Input
              label="Location"
              value={editingEvent?.location || ''}
              onChange={(e) =>
                setEditingEvent({ ...editingEvent, location: e.target.value })
              }
              startIcon={<MapPin size={18} />}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Start Date"
                type="datetime-local"
                value={
                  editingEvent?.startDate
                    ? format(new Date(editingEvent.startDate), "yyyy-MM-dd'T'HH:mm")
                    : ''
                }
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    startDate: new Date(e.target.value).toISOString(),
                  })
                }
                required
              />

              <Input
                label="End Date"
                type="datetime-local"
                value={
                  editingEvent?.endDate
                    ? format(new Date(editingEvent.endDate), "yyyy-MM-dd'T'HH:mm")
                    : ''
                }
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    endDate: new Date(e.target.value).toISOString(),
                  })
                }
              />
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
                      editingEvent?.category === category ? 'primary' : 'outline'
                    }
                    onClick={() =>
                      setEditingEvent({
                        ...editingEvent,
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
              value={editingEvent?.description || ''}
              onChange={(e) =>
                setEditingEvent({
                  ...editingEvent,
                  description: e.target.value,
                })
              }
            />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="reminder"
                checked={editingEvent?.reminder || false}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    reminder: e.target.checked,
                  })
                }
                className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
              />
              <label
                htmlFor="reminder"
                className="text-sm font-medium text-neutral-700"
              >
                Set Reminder
              </label>
            </div>

            <Button type="submit" fullWidth>
              {editingEvent?.id ? 'Update Event' : 'Add Event'}
            </Button>
          </form>
        </Card>
      )}

      <div className="grid gap-4">
        {events.map((event) => (
          <Card key={event.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{event.title}</h3>
                {event.location && (
                  <p className="text-neutral-600 flex items-center gap-1">
                    <MapPin size={16} />
                    {event.location}
                  </p>
                )}
                <div className="flex gap-2 mt-2">
                  <Badge
                    variant={
                      event.category === 'academic'
                        ? 'primary'
                        : event.category === 'extracurricular'
                        ? 'secondary'
                        : event.category === 'personal'
                        ? 'accent'
                        : 'neutral'
                    }
                  >
                    {event.category}
                  </Badge>
                  {event.reminder && (
                    <Badge variant="warning">Reminder Set</Badge>
                  )}
                </div>
                <p className="text-sm text-neutral-500 mt-2">
                  {format(new Date(event.startDate), 'PPp')}
                  {event.endDate &&
                    ` - ${format(new Date(event.endDate), 'PPp')}`}
                </p>
                {event.description && (
                  <p className="mt-2 text-sm text-neutral-600">
                    {event.description}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(event)}
                  icon={<Edit2 size={16} />}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(event.id)}
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