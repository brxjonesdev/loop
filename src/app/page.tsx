import LandingHero from '@/components/landing/landing-hero';
import LandingFeatures from '@/components/landing/landing-features';
import LandingBlog from '@/components/landing/landing-blog';
export default async function Home() {
  // const session = await getSession();
  // if (session?.user) {
  //   redirect('/home');
  // }
  return (
    <main className="h-dvh font-sans space-y-10">
      <LandingHero />
      <LandingBlog />
      <LandingFeatures />

      <div className="w-full py-10  bg-foreground text-background" />
    </main>
  );
}
