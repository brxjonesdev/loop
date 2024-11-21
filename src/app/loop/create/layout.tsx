import HomeHeader from '@/components/home/home-header';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-dvh w-full font-sans flex flex-col">
      <HomeHeader />
      {children}
      <div className="w-full py-5  bg-foreground text-background mt-20" />
    </main>
  );
}
