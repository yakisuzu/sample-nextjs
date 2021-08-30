import React from "react";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { SnackbarProvider } from "notistack";

import { Login } from "@/components/Login";
import { Notice } from "@/components/Notice";
import { repositories } from "@/domain/Repositories";

const CustomApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <SnackbarProvider>
      <Notice
        render={(notice) => (
          <Login
            {...repositories}
            {...notice}
            render={(login) => (
              <Component
                {...pageProps}
                {...repositories}
                {...notice}
                {...login}
              />
            )}
          />
        )}
      />
    </SnackbarProvider>
  );
};
export default CustomApp;
