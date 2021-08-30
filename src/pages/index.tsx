import React from "react";
import Head from "next/head";
import Link from "next/link";
import { NextPage } from "next";
import { Button } from "@material-ui/core";

import { useCount } from "@/domain/UseCount";
import { CustomProps } from "@/components/PropsType";

const Home: NextPage<CustomProps> = ({ login }: CustomProps) => {
  const { format, countUp } = useCount(1, 2);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Button onClick={countUp}>COUNT UP</Button>
        {format()}
        <h1>
          <Link href="/posts/sample">
            <a>Goto Sample page</a>
          </Link>
        </h1>

        {login.employee && (
          <>
            <span>LoginEmployeeId: {login.employee.employeeId}</span>
            <br />
            <span>LoginEmployeeName: {login.employee.employeeName}</span>
            <br />
          </>
        )}

        {login.employee ? (
          <Button variant="contained" onClick={login.logout}>
            Logout
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={login.login}>
            Login
          </Button>
        )}
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
        </a>
      </footer>
    </div>
  );
};
export default Home;
