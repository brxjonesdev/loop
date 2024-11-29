import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Settings from '@/app/home/profile/page';

export default function Budget() {
  const budget = 300.0;
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Budgeting</h2>
        <Button variant="outline" size="sm">
          Add expense
        </Button>
      </div>
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold">${budget}</div>
          <div className="flex items-center gap-4 mt-4">
            <Button variant="outline" size="sm">
              Set budget
            </Button>
            <Button variant="outline" size="sm">
              Debt summary
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
