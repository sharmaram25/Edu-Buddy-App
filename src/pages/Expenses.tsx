import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, X, DollarSign, Repeat } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useData } from '../contexts/DataContext';
import { Expense } from '../types';
import { format } from 'date-fns';

export const Expenses: React.FC = () => {
  const { expenses, addExpense, updateExpense, deleteExpense } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Partial<Expense> | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingExpense) {
      if (editingExpense.id) {
        updateExpense(editingExpense.id, editingExpense);
      } else {
        addExpense({
          title: editingExpense.title || '',
          amount: editingExpense.amount || 0,
          date: editingExpense.date || new Date().toISOString().split('T')[0],
          category: editingExpense.category || 'other',
          description: editingExpense.description,
          recurring: editingExpense.recurring || false,
        });
      }
      setIsEditing(false);
      setEditingExpense(null);
    }
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      deleteExpense(id);
    }
  };

  const categoryOptions = [
    'books',
    'food',
    'transportation',
    'housing',
    'entertainment',
    'other',
  ] as const;

  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Expenses</h1>
          <p className="text-neutral-600">
            Total: ₹{totalExpenses.toFixed(2)}
          </p>
        </div>
        {!isEditing && (
          <Button
            onClick={() => {
              setEditingExpense({});
              setIsEditing(true);
            }}
            icon={<Plus size={20} />}
          >
            Add Expense
          </Button>
        )}
      </div>

      {isEditing && (
        <Card className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {editingExpense?.id ? 'Edit Expense' : 'New Expense'}
              </h2>
              <Button
                variant="text"
                onClick={() => {
                  setIsEditing(false);
                  setEditingExpense(null);
                }}
                icon={<X size={20} />}
              >
                Cancel
              </Button>
            </div>

            <Input
              label="Title"
              value={editingExpense?.title || ''}
              onChange={(e) =>
                setEditingExpense({ ...editingExpense, title: e.target.value })
              }
              required
            />

            <Input
              label="Amount (₹)"
              type="number"
              step="0.01"
              value={editingExpense?.amount || ''}
              onChange={(e) =>
                setEditingExpense({
                  ...editingExpense,
                  amount: parseFloat(e.target.value),
                })
              }
              startIcon={<DollarSign size={18} />}
              required
            />

            <Input
              label="Date"
              type="date"
              value={editingExpense?.date || ''}
              onChange={(e) =>
                setEditingExpense({ ...editingExpense, date: e.target.value })
              }
              required
            />

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
                      editingExpense?.category === category ? 'primary' : 'outline'
                    }
                    onClick={() =>
                      setEditingExpense({
                        ...editingExpense,
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
              value={editingExpense?.description || ''}
              onChange={(e) =>
                setEditingExpense({
                  ...editingExpense,
                  description: e.target.value,
                })
              }
            />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="recurring"
                checked={editingExpense?.recurring || false}
                onChange={(e) =>
                  setEditingExpense({
                    ...editingExpense,
                    recurring: e.target.checked,
                  })
                }
                className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
              />
              <label
                htmlFor="recurring"
                className="text-sm font-medium text-neutral-700"
              >
                Recurring Expense
              </label>
            </div>

            <Button type="submit" fullWidth>
              {editingExpense?.id ? 'Update Expense' : 'Add Expense'}
            </Button>
          </form>
        </Card>
      )}

      <div className="grid gap-4">
        {expenses.map((expense) => (
          <Card key={expense.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{expense.title}</h3>
                <p className="text-xl font-bold text-primary-600">
                  ₹{expense.amount.toFixed(2)}
                </p>
                <div className="flex gap-2 mt-2">
                  <Badge
                    variant={
                      expense.category === 'books'
                        ? 'primary'
                        : expense.category === 'food'
                        ? 'secondary'
                        : expense.category === 'transportation'
                        ? 'accent'
                        : 'neutral'
                    }
                  >
                    {expense.category}
                  </Badge>
                  {expense.recurring && (
                    <Badge variant="warning" className="flex items-center gap-1">
                      <Repeat size={14} />
                      Recurring
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-neutral-500 mt-2">
                  {format(new Date(expense.date), 'PP')}
                </p>
                {expense.description && (
                  <p className="mt-2 text-sm text-neutral-600">
                    {expense.description}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(expense)}
                  icon={<Edit2 size={16} />}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(expense.id)}
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