import { UserButton } from "@clerk/nextjs";
import { type NextPage } from "next";
import Image from "next/image";
import CentralappLogo from "../../public/Logo.svg";

const Home: NextPage = () => {
  return (
    <>
      <main className=" flex min-h-screen w-full flex-col bg-slate-100">
        <div className="mr-6 mt-6 flex justify-end">
          <UserButton afterSignOutUrl="/" />
        </div>
        <div className="flex grow items-center justify-center ">
          {/*eslint-disable-next-line @typescript-eslint/no-unsafe-assignment*/}
          <Image alt="Centralapp Logo" src={CentralappLogo} className="h-1/2" />
        </div>
      </main>
    </>
  );
};

export default Home;
