import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Recommendations() {
  return (
    <section className="space-y-4">
      <div className="flex items-center">
        <h2 className="text-lg font-semibold">Explore</h2>
        <Button variant="outline" size="sm" className="ml-auto">
          Browse all
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-3">
            <img
              src="/placeholder.svg?height=100&width=200"
              alt="Japan travel"
              className="rounded-md mb-2 w-full h-32 object-cover"
            />
            <h3 className="font-medium text-sm">Top places for Japan</h3>
            <p className="text-xs text-muted-foreground">
              Most often seen on the web
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <img
              src="/placeholder.svg?height=100&width=200"
              alt="Japan guide"
              className="rounded-md mb-2 w-full h-32 object-cover"
            />
            <h3 className="font-medium text-sm">
              Travel & Japan Video Game Guide
            </h3>
            <p className="text-xs text-muted-foreground">
              Popular guide for travelers
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <img
              src="/placeholder.svg?height=100&width=200"
              alt="Hotel search"
              className="rounded-md mb-2 w-full h-32 object-cover"
            />
            <h3 className="font-medium text-sm">
              Search hotels with transparent pricing
            </h3>
            <p className="text-xs text-muted-foreground">Find the best deals</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
