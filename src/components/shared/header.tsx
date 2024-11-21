import UserInfo from './userinfo';

export default function Header() {
  return (
    <header className="w-full bg-background px-4 font-sans">
      <div className="container flex flex-row  mx-auto py-4 items-center gap-6 justify-between">
        <div className="">
          <p className="font-semibold text-3xl">Loop</p>
        </div>
        <div className="justify-start items-center gap-4 flex flex-row">
          <UserInfo />
        </div>
      </div>
    </header>
  );
}
