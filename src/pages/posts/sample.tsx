import React from "react";
import Link from "next/link";
import { NextPage } from "next";
import { CustomProps } from "@/components/PropsType";

const Sample: NextPage<CustomProps> = ({
  login,
  showMessage,
  loginRepository,
}: CustomProps) => {
  showMessage("info", "表示しました");
  return (
    <>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
      {login.employee && (
        <>
          <span>LoginEmployeeId: {login.employee.employeeId}</span>
          <br />
          <span>LoginEmployeeName: {login.employee.employeeName}</span>
          <br />
        </>
      )}
    </>
  );
};
export default Sample;
