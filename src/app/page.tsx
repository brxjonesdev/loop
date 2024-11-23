import LandingHero from '@/components/landing/landing-hero';
import LandingFeatures from '@/components/landing/landing-features';
import LandingBlog from '@/components/landing/landing-blog';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    console.log('error', error);
  } else {
    redirect('/home');
  }

  return (
    <main className="h-dvh font-sans space-y-10">
      <LandingHero />
      <LandingBlog />
      <LandingFeatures />
    </main>
  );
}
