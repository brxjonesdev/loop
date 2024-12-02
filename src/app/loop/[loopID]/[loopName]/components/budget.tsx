'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useItineraryStore } from '@/stores/itinerary-store-provider';
import {
  MoreVertical,
  Plus,
  Trash2,
  Edit,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { nanoid } from 'nanoid';
import { createClient } from '@/utils/supabase/client';

type Expense = {
  id: string;
  cost: number;
  category: string;
  description: string;
};

type SortField = 'cost' | 'category' | 'description';

export default function Budget({loopID}: {loopID: string}) {
  const supabase = createClient()
  const { budget, addExpense, updateBudget, updateExpense, deleteExpense } =
    useItineraryStore((state) => state);
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [newExpense, setNewExpense] = useState<Omit<Expense, 'id'>>({
    cost: 0,
    category: '',
    description: '',
  });
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [sortField, setSortField] = useState<SortField>('cost');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterCategory, setFilterCategory] = useState<string>('all'); 

  useEffect(() => {
    if (budget?.expenses) {
      const total = budget.expenses.reduce(
        (sum, expense) => sum + expense.cost,
        0
      );
      setTotalExpenses(total);
    }
  }, [budget?.expenses]);

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newExpense.cost && newExpense.category) {
      addExpense({
        id: `expense-${nanoid(24)}`,
        ...newExpense,
        cost: parseFloat(newExpense.cost.toString()),
      });
      setNewExpense({ cost: 0, category: '', description: '' });
      setIsAddingExpense(false);

      // Add expense to the database
      const { error } = await supabase
        .from('expenses')
        .insert({
          cost: newExpense.cost,
          category: newExpense.category,
          description: newExpense.description,
          budget_id: budget?.budget_id,
        })
        .single();

      if (error) {
        console.error('Error adding expense:', error);
      }
    }
  };

  const handleUpdateBudget = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const total = parseFloat(form.total.value);
    updateBudget({
      ...budget,
      total,
    });
    const { error } = await supabase.from('budgets').update({
      total
    }).eq('budget_id', budget?.budget_id);
    if (error) {
      console.error('Error updating budget:', error);
    }


    
    setIsEditingBudget(false);
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const handleUpdateExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingExpense) {
      updateExpense(editingExpense);
      setEditingExpense(null);
    }

    // Update expense in the database
    const { error } = await supabase
      .from('expenses')
      .update({
        cost: editingExpense?.cost,
        category: editingExpense?.category,
        description: editingExpense?.description,
      })
      .eq('id', editingExpense?.id);
      if(error){
        console.error('Error updating expense:',  error);
      }
  };

  const handleDeleteExpense = async (id: string) => {
    deleteExpense(id);

    // Delete expense from the database
    const { error } = await supabase.from('expenses').delete().eq('id', id);
    if (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedAndFilteredExpenses = budget?.expenses
    ? budget.expenses
        .filter(
          (expense) =>
            filterCategory === 'all' || expense.category === filterCategory
        ) // Updated filter logic
        .sort((a, b) => {
          if (a[sortField] < b[sortField])
            return sortDirection === 'asc' ? -1 : 1;
          if (a[sortField] > b[sortField])
            return sortDirection === 'asc' ? 1 : -1;
          return 0;
        })
    : [];


  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Budgeting</h2>
      </div>
      <Card className="shadow-none p-0">
        <CardContent className="p-4">
          <section className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {isEditingBudget ? (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between py-2">
                  <h3 className="text-xl font-semibold">Total Budget</h3>
                </CardHeader>
                <Separator />
                <CardContent>
                  <form onSubmit={handleUpdateBudget} className="mt-4">
                    <Input
                      type="number"
                      name="total"
                      defaultValue={budget?.total || 0}
                      className="w-full p-2 border rounded"
                      min="0"
                      step="0.01"
                      required
                    />
                    <div className="mt-2">
                      <Button
                        type="submit"
                        className="bg-primary text-primary-foreground mr-2"
                      >
                        Save
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setIsEditingBudget(false)}
                        variant="outline"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between py-2">
                  <h3 className="text-xl font-semibold">Total Budget</h3>
                  <Button
                    onClick={() => setIsEditingBudget(true)}
                    variant="ghost"
                    className="p-0 m-0"
                  >
                    <MoreVertical className="text-primary" />
                  </Button>
                </CardHeader>
                <Separator />
                <CardContent className="p-0">
                  <div className="flex items-center justify-center bg-primary/20 p-4 rounded-b-xl">
                    <p className="text-lg font-mono">
                      {budget?.currency || '$'} {budget?.total || '0'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
            <Card className="h-fit">
              <CardHeader className="flex flex-row items-center justify-between py-2">
                <h3 className="text-xl font-semibold">Remaining Amount</h3>
                <Button variant="ghost" className="p-0 m-0"></Button>
              </CardHeader>
              <Separator />
              <CardContent className="p-0">
                <div className="flex items-center justify-center bg-green-500/20 p-4 rounded-b-xl">
                  <p className="text-lg font-mono">
                    {budget?.currency || '$'}{' '}
                    {(budget?.total ?? 0) - totalExpenses}
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        </CardContent>
        <Separator />
        {budget?.expenses && budget.expenses.length > 0 && (
          <CardContent className="p-4 px-6">
          <CardTitle className="text-lg font-medium">Expenses</CardTitle>
          <CardDescription>
            Expenses in this loop, grouped by category.
          </CardDescription>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>{' '}
                  {/* Updated SelectItem */}
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Transportation">Transportation</SelectItem>
                  <SelectItem value="Accommodation">Accommodation</SelectItem>
                  <SelectItem value="Activities">Activities</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleSort('cost')}
                >
                  Cost{' '}
                  {sortField === 'cost' &&
                    (sortDirection === 'asc' ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleSort('category')}
                >
                  Category{' '}
                  {sortField === 'category' &&
                    (sortDirection === 'asc' ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </Button>
              </div>
            </div>
            {sortedAndFilteredExpenses.length > 0 ? (
              <ul className="space-y-2 max-h-96  overflow-y-scroll bg-black/10 p-2 rounded-sm">
                {sortedAndFilteredExpenses.map((expense) => (
                  <li
                    key={expense.id}
                    className="flex justify-between items-center w-full"
                  >
                    <Card className="w-full">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex flex-col">
                          <p>{expense.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {expense.category}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <p>
                            {budget?.currency || '$'} {expense.cost}
                          </p>
                          <Dialog open={!!editingExpense}>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditExpense(expense)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Expense</DialogTitle>
                              </DialogHeader>
                              <form
                                onSubmit={handleUpdateExpense}
                                className="space-y-4"
                              >
                                <div>
                                  <Label htmlFor="edit-cost">Cost</Label>
                                  <Input
                                    id="edit-cost"
                                    type="number"
                                    value={editingExpense?.cost || 0}
                                    onChange={(e) =>
                                      setEditingExpense((prev) =>
                                        prev
                                          ? {
                                              ...prev,
                                              cost: parseFloat(e.target.value),
                                            }
                                          : null
                                      )
                                    }
                                    required
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-category">
                                    Category
                                  </Label>
                                  <Select
                                    value={editingExpense?.category || ''}
                                    onValueChange={(value) =>
                                      setEditingExpense((prev) =>
                                        prev
                                          ? { ...prev, category: value }
                                          : null
                                      )
                                    }
                                  >
                                    <SelectTrigger id="edit-category">
                                      <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Food">Food</SelectItem>
                                      <SelectItem value="Transportation">
                                        Transportation
                                      </SelectItem>
                                      <SelectItem value="Accommodation">
                                        Accommodation
                                      </SelectItem>
                                      <SelectItem value="Activities">
                                        Activities
                                      </SelectItem>
                                      <SelectItem value="Other">
                                        Other
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label htmlFor="edit-description">
                                    Description
                                  </Label>
                                  <Input
                                    id="edit-description"
                                    type="text"
                                    value={editingExpense?.description || ''}
                                    onChange={(e) =>
                                      setEditingExpense((prev) =>
                                        prev
                                          ? {
                                              ...prev,
                                              description: e.target.value,
                                            }
                                          : null
                                      )
                                    }
                                    required
                                  />
                                </div>
                                <Button type="submit">Update Expense</Button>
                              </form>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteExpense(expense.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-muted-foreground">
                No expenses found.
              </p>
            )}
          </div>
         
        </CardContent>
        )}
         {isAddingExpense ? (
            <form onSubmit={handleAddExpense} className="mt-4 space-y-4 p-4">
              <Input
                type="number"
                placeholder="Amount"
                value={newExpense.cost || ''}
                onChange={(e) =>
                  setNewExpense({
                    ...newExpense,
                    cost: parseFloat(e.target.value),
                  })
                }
                required
              />
              <Select
                value={newExpense.category}
                onValueChange={(value) =>
                  setNewExpense({ ...newExpense, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Transportation">Transportation</SelectItem>
                  <SelectItem value="Accommodation">Accommodation</SelectItem>
                  <SelectItem value="Activities">Activities</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="text"
                placeholder="Description"
                value={newExpense.description}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, description: e.target.value })
                }
                required
              />
              <div>
                <Button
                  type="submit"
                  className="bg-primary text-primary-foreground mr-2"
                >
                  Add Expense
                </Button>
                <Button
                  type="button"
                  onClick={() => setIsAddingExpense(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <Button
              variant="link"
              className="h-fit  mt-2 p-0 m-4"
              onClick={() => setIsAddingExpense(true)}
            >
              <Plus className="mr-1 h-4 w-4" /> Add Expense
            </Button>
          )}
        
      </Card>
    </section>
  );
}
