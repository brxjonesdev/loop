import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import Logout from './components/logout';
import UsernameChange from './components/username';
import CloseAccount from './components/close-account';
import ShamelessPlug from './components/shameless-plus';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Settings() {
  return (
    <main className="flex-1 w-full rounded-xl overflow-y-scroll flex items-center justify-center my-4">
      <Card className="shadow-none w-full max-w-3xl  h-fit font-sans flex flex-col ">
        <CardHeader>
          <Link
            className={`w-fit p-0 h-fit flex items-center justify-between gap-3 font-sans text-md hover:underline`}
            href="/home"
          >
            Back
          </Link>
          <CardTitle className="text-3xl">Settings</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-scroll space-y-4">
          <Logout />
          <UsernameChange />
          <CloseAccount />
          <ShamelessPlug />
        </CardContent>
      </Card>
    </main>
  );
}
