import React, { useState } from "react";

type UseCountType = {
  text(): string;
  format(): JSX.Element;
  countUp(): void;
};

// repositoryなどの依存関係は引数で受ける
export function useCount(init = 1, step = 2): UseCountType {
  const [count, setCount] = useState(init);

  function text(): string {
    return `count is ${count}`;
  }

  function format(): JSX.Element {
    return <span>{text()}</span>;
  }

  function countUp(): void {
    setCount(count * step);
  }

  return { text, format, countUp };
}
