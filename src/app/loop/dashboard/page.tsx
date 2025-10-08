import React from 'react'
import { createClient } from '@/lib/auth/supabase/server';
import Tasks from './_components/tasks';
import Projects from './_components/projects';
import RecentActivity from './_components/recent-activity';

export default async function Dashboard() {
//   const supabase = await createClient();
//   const { data: { user } } = await supabase.auth.getUser();
//   console.log('User:', user);
//   const { data: { session } } = await supabase.auth.getSession()
// const githubToken = session?.provider_token
// console.log('GitHub Token:', githubToken);
//   {/* 
//     Dashboard page content
//     - Shows an overview of projects, tasks, and recent activity

//   */}

//   async function fetchUserRepos(githubToken, username) {
//   const response = await fetch(
//     `https://api.github.com/users/${username}/repos`,
//     {
//       headers: {
//         'Authorization': `Bearer ${githubToken}`,
//         'Accept': 'application/vnd.github+json'
//       }
//     }
//   )
//   return response.json()
// }

// async function getUserRepos() {
//   if (!githubToken) return [];
//   console.log('Fetching repos for user:', user?.user_metadata.user_name);
//   const username = user?.user_metadata.user_name;

//   const userRepos = await fetchUserRepos(githubToken, username);
//   console.log('User Repositories:', userRepos);
//   return userRepos;
// }
//   const repos = await getUserRepos();
//   console.log('Repos:', repos);



// Tasks, Overview, Recent Activity
const username = "Irene"; // Replace with dynamic username if available
const user = null

  return (
    <main className="w-full p-6 space-y-10">
      <section className=''>
        <h1 className="text-lg lg:text-3xl font-bold">Welcome In, {user?.user_metadata.user_name || username}!</h1>
        <p>What would you like to do today?</p>
      </section>
      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <Tasks/>
        <Projects/>
        <RecentActivity/>

      </section>
    </main>
  )
}
