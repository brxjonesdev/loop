import React from 'react';
import { createClient } from '@/utils/supabase/server';
import OnboardingCheck from '@/components/home/onboarding';
import { redirect } from 'next/navigation';


export default async function Homepage() {
  const supabase = await createClient();
  const { data: {user}, error } = await supabase.auth.getUser();
  if (!user || error) {
      redirect('/')
  }
  const {data, error: profileError} = await supabase.from("profiles").select("*").eq("user_id", user.id).single();
  if (profileError || !data) {
      return <OnboardingCheck/>;
  }

 


  return (
    <section className="flex-1 mx-10 flex flex-col gap-12">
      <p>Boys</p>

      {/* Sections
        - user's recent loops, and a button to create a new loop.
        - Collaborator Updates
        - local reccomendations based on zipcode.
      */}
    </section>
  );
}
