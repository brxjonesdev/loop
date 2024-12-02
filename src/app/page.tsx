import LandingHero from '@/components/landing/landing-hero';
import LandingFeatures from '@/components/landing/landing-features';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import FutureFeatures from '@/components/landing/landing-future';

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
    <main className="flex-1 font-sans space-y-10">
      <LandingHero />
      <FutureFeatures />
      <LandingFeatures />
    </main>
  );
}
