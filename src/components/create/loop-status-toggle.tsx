'use client';
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function LoopStatusToggle({
  isPrivate,
  onToggle,
}: {
  isPrivate: boolean;
  onToggle: () => void;
}) {
  return (
    <section className="flex gap-4 w-full justify-end items-center">
      <Label htmlFor="loop-status">
        {!isPrivate ? 'Public' : 'Private'} Loop
      </Label>
      <Switch id="loop-status" checked={isPrivate} onCheckedChange={onToggle} />
    </section>
  );
}
