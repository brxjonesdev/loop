import Link from 'next/link';
import UserInfo from './userinfo';

export default function Header() {
  return (
    <header className="w-full bg-background px-4 lg:px-10 font-sans container flex flex-row  mx-auto pt-4 items-center gap-6 justify-between min-h-[75px]">
      <div className="">
        <Link href="/home">
          <p className="font-semibold text-3xl">Loop</p>
        </Link>
      </div>
      <div className="justify-start items-center gap-4 flex flex-row">
        <UserInfo />
      </div>
    </header>
  );
}
