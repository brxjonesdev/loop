import React from 'react';
import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

async function getAllBlogPosts() {
  const blogDir = path.join(process.cwd(), '/src/app/blog');
  const files = await fs.readdir(blogDir);

  const posts = await Promise.all(
    files
      .filter((file) => path.extname(file) === '.mdx')
      .map(async (file) => {
        const filePath = path.join(blogDir, file);
        const fileContent = await fs.readFile(filePath, 'utf8');
        const { data } = matter(fileContent);
        return {
          slug: file.replace('.mdx', ''),
          title: data.title || 'Untitled',
          description: data.description || 'No description available',
          date: data.date || 'No date',
        };
      })
  );

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export default async function BlogIndex() {
  const allPosts = await getAllBlogPosts();

  return (
    <main className="h-dvh font-sans space-y-10">
      <header className="w-full bg-background px-10">
        <div className="container flex flex-row  mx-auto py-4 items-baseline gap-6 ">
          <div className="">
            <p className="font-semibold text-2xl">Loop</p>
          </div>
          <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
            <Link href="/" className="font-mono">
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>
      <div className="mx-auto px-10">
        <h1 className="text-4xl font-bold mb-8">All Blog Posts</h1>
        <div className="space-y-8">
          {allPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block group"
            >
              <Card className='hover:bg-black/5 w-fit'>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>{post.description}</CardDescription>
                  <CardDescription>
                    {' '}
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
