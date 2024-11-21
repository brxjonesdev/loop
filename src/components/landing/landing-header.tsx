export default function LandingHeader() {
  return (
    <header className="w-full z-40 fixed top-0 left-0 bg-background px-10">
      <div className="container flex flex-row  mx-auto py-4 items-baseline gap-6 ">
        <div className="">
          <p className="font-semibold text-2xl">Loop</p>
        </div>
        <div className="justify-start items-center gap-4 lg:flex hidden flex-row"></div>
      </div>
    </header>
  );
}
