'use clinet';
import React from 'react';
import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

async function getBlogPosts() {
  const blogDir = path.join(process.cwd(), '/src/app/blog');
  console.log(blogDir);
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
          image: data.image || null,
        };
      })
  );

  return posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);
}

export default async function LandingBlog() {
  const latestPosts = await getBlogPosts();

  return (
    <div className="w-full pb-20 px-10">
      <div className="container mx-auto flex flex-col gap-7">
        <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
          <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
            Latest articles
          </h2>
          <Button asChild className="gap-4">
            <Link href="/blog">
              View all articles <MoveRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .slice(0, 3)
            .map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex flex-col gap-2 hover:opacity-75 cursor-pointer group"
              >
                <Card className="w-full  overflow-ellipsis">
                  <CardHeader>
                    <CardTitle className="text-md tracking-tight">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-sm overflow-ellipsis max-h-[100px]">
                      {post.description}
                    </CardDescription>
                  </CardHeader>

                  <CardFooter className="text-sm">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </CardFooter>
                </Card>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
