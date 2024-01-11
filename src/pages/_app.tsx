import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Sidebar } from "~/components/Sidebar";
import { useRouter } from "next/router";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "~/utils/store";

const publicPages = ["/sign-up/[[...index]]"];
const pagesWithoutSidebar = [
  "/nursery/certificateForm/[id]",
  "/sign-in/[[...index]]",
];

const MyApp: AppType = ({ Component, pageProps }) => {
  const { pathname } = useRouter();
  const isPublicPage = publicPages.includes(pathname);
  const isPageWithoutSidebar = pagesWithoutSidebar.includes(pathname);

  return (
    <ClerkProvider {...pageProps}>
      <ChakraProvider>
        <Provider store={store}>
          <Head>
            <title>Centralab</title>
            <meta name="description" content="Daniel Fontes" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          {isPublicPage === true && <Component {...pageProps} />}
          {isPageWithoutSidebar ? (
            <div>
              <Component {...pageProps} />
            </div>
          ) : (
            <div className="flex">
              <Sidebar />
              <div className="h-full min-h-screen  flex-auto">
                <>
                  <SignedIn>
                    <Component {...pageProps} />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              </div>
            </div>
          )}
        </Provider>
      </ChakraProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
