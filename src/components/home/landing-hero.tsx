import Link from 'next/link';
import { Button} from '@/components/ui/button';
import { MoveRight } from 'lucide-react';

export default function LandingHero() {
  return (
    <div className="w-full">
    <div className="container mx-auto">
      <div className="flex gap-8 py-20 lg:py-26 items-center justify-center flex-col">
        <div>
          <Link href="/blog/intro-about-loop">
          <Button variant="secondary" size="sm" className="gap-4">
            Read our intro article <MoveRight className="w-4 h-4" />
          </Button>
          </Link>
        </div>
        <div className="flex gap-4 flex-col">
          <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
          Plan your perfect trip with Loop!
          </h1>
          <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
          Loop makes trip planning fun and easy. Organize itineraries, vote
              on destinations, and collaborate on packing lists—all in real
              time!
          </p>
        </div>
        <div className="flex flex-row gap-3">
         <Link href="https://github.com/brxjonesdev/loop">
          <Button size="lg" className="gap-4">
            Find Out More About Loop <MoveRight className="w-4 h-4" />
          </Button>
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
}
