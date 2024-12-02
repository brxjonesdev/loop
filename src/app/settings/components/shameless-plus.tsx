import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function ShamelessPlug() {
  return (
    <div className=" p-4 rounded-lg flex  justify-between items-center   border border-black/20">
      <p className="text-sm">
        This project was made with love by{' '}
        <a
          href="https://portfolio.braxtonjones.dev/"
          className="font-mono text-purple-400"
        >
          brxjonesdev
        </a>
      </p>
      <Link
        href="https://portfolio.braxtonjones.dev/"
        className={`${buttonVariants({ variant: 'outline', size: 'sm' })} w-fit`}
      >
        See my other works.
      </Link>
    </div>
  );
}
