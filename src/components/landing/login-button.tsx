import { MoveRight } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';

export default function LoginButton() {
  return (
    <Button className="gap-4" size={'lg'}>
      Sign up for Loop <MoveRight className="w-4 h-4" />
    </Button>
  );
}
