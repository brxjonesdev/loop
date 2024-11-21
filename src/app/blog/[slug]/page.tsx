import { promises as fs } from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import Link from 'next/link';

// Define a components object
const components = {};

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), '/src/app/blog');
  const files = await fs.readdir(blogDir);

  return files
    .filter((file) => path.extname(file) === '.mdx')
    .map((file) => ({
      slug: file.replace('.mdx', ''),
    }));
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const filePath = path.join(
    process.cwd(),
    '/src/app/blog',
    `${params.slug}.mdx`
  );
  console.log(filePath, 'filePath');
  const fileContent = await fs.readFile(filePath, 'utf8');

  const { content, frontmatter } = await compileMDX({
    source: fileContent,
    options: { parseFrontmatter: true },
    components,
  });

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
      <article className="mx-auto px-10 text-left flex flex-col items-center pb-10">
        <h1 className="text-4xl font-bold mb-4 ">
          {frontmatter.title as string}
        </h1>
        <time
          dateTime={frontmatter.date as string}
          className="text-sm text-muted-foreground block mb-6"
        >
          {new Date(
            frontmatter.date as string | number | Date
          ).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <div className="prose lg:prose-lg mx-auto">{content}</div>
      </article>
    </main>
  );
}
