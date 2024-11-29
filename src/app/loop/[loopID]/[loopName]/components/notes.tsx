"use client"
import React from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';

export default function Notes({ loopID }: { loopID: string }) {
  const supabase = createClient();
  const [note, setNote] = React.useState<string | undefined>(undefined);
  const [updatedNote, setUpdatedNote] = React.useState<string | undefined>(note);

  console.log('note', note);
  console.log('updatedNote', updatedNote);

  React.useEffect(() => {
    const fetchNote = async () => {
      const { data, error } = await supabase.from('loops').select('note').eq('loop_id', loopID);
      if (error) {
        console.error('Error fetching notes', error);
        return;
      }
      if (data && data.length > 0) {
        console.log(data[0].note);
        setNote(data[0].note);
      } else {
        setNote(undefined);
      }
    };

    fetchNote();
  }, [loopID]);
  return (
    <Collapsible className="w-full">
      <CollapsibleTrigger className="flex items-center w-full">
        <h2 className="text-lg font-semibold">Notes</h2>
        <ChevronDown className="ml-2 h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className=''>
      <Textarea
        placeholder="Write or paste anything here: how to get around, tips and tricks"
        className="mt-2 text-xs resize-none min-h-40"
        value={updatedNote || undefined}
        onChange={(e) => setUpdatedNote(e.target.value)}
      />
      {/* If note and if the note isnt the same as updatedNote show the save button */}
      {note !== updatedNote && (
         <Button
         className="mt-2"
         onClick={async () => {
           if (note === updatedNote) {
             console.log('Note is the same as updated note');
             return;
           }
           const { error } = await supabase
             .from('loops')
             .update({ note: updatedNote })
             .eq('loop_id', loopID);
           if (error) {
             console.error('Error updating note', error);
             return;
           }
           console.log('Note updated successfully');
           setNote(updatedNote);
         }}
       >
         Save
       </Button>
      )}
     
      </CollapsibleContent>
    </Collapsible>
  );
}
