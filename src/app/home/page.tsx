import React from 'react';
import { createClient } from '@/utils/supabase/server';
import OnboardingCheck from '@/components/home/onboarding';
import { redirect } from 'next/navigation';
import RecentLoops from '@/components/home/recent-loops';
import LocalRecommendations from '@/components/home/local-recommendations';
import LiveUpdatesBrief from '@/components/home/live-updates-brief';

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
    .eq('user_id', user.id);
  if (loopError) {
    console.error("Error fetching user's loops:", loopError.message);
  }

  return (
    <section className="flex-1 flex flex-col gap-12 w-full bg-background  font-sans container pt-8 pb-12 mx-auto ">
      <RecentLoops loops={loops} />
      <div className="lg:flex gap-4 space-y-12 lg:space-y-0">
        <LiveUpdatesBrief />
        <LocalRecommendations />
      </div>
    </section>
  );
}
