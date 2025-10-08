import React from 'react'
import { createClient } from '@/lib/auth/supabase/server';

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

  return (
    <div className='font-body text-red-500'>Dashboard</div>
  )
}
