import React from 'react'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Paperclip } from 'lucide-react';


export default function OtherAttachments() {
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button
      disabled
        variant="outline"
        className="flex-1 h-10 w-full flex  items-center justify-center transition-all hover:bg-primary hover:text-primary-foreground font-sans"
      >
        <Paperclip className="w-4 h-4" />
        <span className="text-xs">Attachments</span>
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px] font-sans rounded-lg">
      <DialogHeader>
        <DialogTitle>Attachments</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="fileUpload">Upload File</Label>
            <Input id="fileUpload" type="file" accept=".pdf,.doc,.docx" />
          </div>
          <div className="text-sm text-muted-foreground">
            Supported file types: PDF, DOC, DOCX
          </div>
        </div>
    </DialogContent>
  </Dialog>
  )
}
