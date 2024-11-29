import React from 'react';
import { createClient } from '@/utils/supabase/server';
import OnboardingCheck from './components/onboarding';
import { redirect } from 'next/navigation';
import RecentLoops from './components/recent-loops';
import LiveUpdatesBrief from './components/live-updates-brief';

export default async function Homepage() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (!user || error) {
    redirect('/');
  }
  const { data, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();
  if (profileError || !data) {
    return <OnboardingCheck />;
  }

  // Get the user's recent loops and loops they are a collaborator on.
  const { data: loops, error: loopError } = await supabase
    .from('loops')
    .select('*')
    .eq('owner_id', user.id);
  if (loopError) {
    console.error("Error fetching user's loops:", loopError.message);
  }

  return (
    <section className="flex-1 gap-10 w-full bg-background font-sans container pt-8 pb-12 mx-auto grid grid-cols-1 xl:grid-cols-[.5fr,1fr]  lg:px-8">
      <LiveUpdatesBrief />
      <RecentLoops loops={loops} />
    </section>
  );
}
