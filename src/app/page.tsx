import LandingHeader from '@/components/landing/landing-header';
import LandingHero from '@/components/home/landing-hero';
import LandingFeatures from '@/components/landing/landing-features';
import LandingBlog from '@/components/landing/landing-blog';

export default function Home() {
  return (
    <main className="h-dvh font-sans space-y-10">
      <LandingHeader />
      <LandingHero />
      <LandingBlog />
      <LandingFeatures />
      
      <div className="w-full py-10  bg-foreground text-background" />
    </main>
  );
}
