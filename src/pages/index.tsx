import { UserButton } from "@clerk/nextjs";
import { type NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <main className="mr-6 mt-6 flex min-h-screen flex-col items-end">
        <div className="">
          <UserButton afterSignOutUrl="/" />
        </div>
      </main>
    </>
  );
};

export default Home;
