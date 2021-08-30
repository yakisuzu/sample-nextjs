import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";

import { initialState, Login, loginReducer } from "@/components/Login";
import { Employee, LoginRepository } from "@/domain/LoginRepository";
import { showMessage, showProgress } from "#/stubProps";

describe("LoginProvider", () => {
  describe("render", () => {
    it("init", () => {
      // コンポーネント初期化サンプル
      // 初期renderで落ちないことを確認する目的
      const loginRepository = {} as LoginRepository;

      const actual = render(
        <Login
          loginRepository={loginRepository}
          showProgress={showProgress}
          showMessage={showMessage}
          render={(login) => <></>}
        />
      );
      expect(actual.asFragment()).toStrictEqual(render(<></>).asFragment());
    });

    it("login", async () => {
      // ここまでやらなくてよい
      // こういったことができる、というサンプル
      const loginRepository = {
        async wait3(): Promise<void> {
          return Promise.resolve();
        },
        async login(): Promise<Employee> {
          return Promise.resolve({ employeeId: "id", employeeName: "name" });
        },
      } as LoginRepository;

      // 子コンポーネントにレンダリングしながらテスト
      const actual = render(
        <Login
          loginRepository={loginRepository}
          showProgress={showProgress}
          showMessage={showMessage}
          render={({ login }) => (
            <span onClick={login.login}>
              loginName: {login.employee?.employeeName}
            </span>
          )}
        />
      );

      // ログイン前
      const span = actual.getByText(/loginName:.*/);
      expect(span.textContent).toStrictEqual("loginName: ");

      // ログイン実行
      fireEvent.click(span);
      await waitFor(() => actual.getByText(/loginName:.*/));

      // ログイン後
      expect(span.textContent).toStrictEqual("loginName: name");
    });
  });

  // loginReducerサンプル
  // reducerのtypeに業務ロジックが集まるのでテスト対象
  describe("loginReducer", () => {
    it("SET_EMPLOYEE", () => {
      const actual = loginReducer(initialState, {
        type: "SET_EMPLOYEE",
        payload: { employeeId: "id", employeeName: "name" },
      });
      const expected = {
        employee: { employeeId: "id", employeeName: "name" },
      };

      expect(actual).toStrictEqual(expected);
    });
    it("CLEAR_EMPLOYEE", () => {
      const actual = loginReducer(
        { employee: { employeeId: "id", employeeName: "name" } },
        { type: "CLEAR_EMPLOYEE" }
      );
      const expected = {};

      expect(actual).toStrictEqual(expected);
    });
  });
});
