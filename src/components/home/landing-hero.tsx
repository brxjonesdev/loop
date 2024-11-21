import { Badge } from '@/components/ui/badge';
import LandingBlog from '../landing/landing-blog';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

export default function LandingHero() {
  return (
    <div className="w-full pt-20 px-10">
      <div
        className="
      grid grid-cols-1 gap-4 items-center md:grid-cols-2
      "
      >
        <div className="flex gap-4 flex-col">
          <div>
            <Badge variant="outline">Pardon Our Dust!</Badge>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-6xl max-w-lg tracking-tighter text-left font-regular">
              Plan your perfect trip with Loop!
            </h1>
            <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
              Loop makes trip planning fun and easy. Organize itineraries, vote
              on destinations, and collaborate on packing lists—all in real
              time!
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <Link href="https://github.com/brxjonesdev/loop/tree/master" className={buttonVariants({ variant: 'outline' })}>
              View Progress On Github
            </Link>

            {/* <LoginButton /> */}
          </div>
        </div>
        {/* <div className="grid grid-cols-2 gap-8">
          <div className="bg-muted rounded-md aspect-video"></div>
          <div className="bg-muted rounded-md aspect-video"></div>
          <div className="bg-muted rounded-md aspect-video"></div>
          <div className="bg-muted rounded-md aspect-video"></div>
          
        </div> */}
        <LandingBlog />
      </div>
    </div>
  );
}
