import LandingHeader from '@/components/landing/landing-header';
import LandingHero from '@/components/home/landing-hero';
import LandingFeatures from '@/components/landing/landing-features';

export default function Home() {
  return (
    <main className="h-dvh font-sans space-y-10">
      <LandingHeader />
      <LandingHero />
      <LandingFeatures />
      {/* <LandingBlog /> */}
      <div className="w-full py-10  bg-foreground text-background" />
    </main>
  );
}
