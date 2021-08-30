import React from "react";
import Error, { ErrorProps } from "next/error";
import { NextPage } from "next";

const CustomError: NextPage<ErrorProps> = (props: ErrorProps) => {
  return <Error {...props} />;
};
export default CustomError;
