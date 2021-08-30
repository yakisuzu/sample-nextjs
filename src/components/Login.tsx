import React, { FC, ReactNode, useReducer } from "react";

import { RepositoriesProps } from "@/domain/Repositories";
import { Employee } from "@/domain/LoginRepository";
import { NoticeProps } from "@/components/Notice";

export type LoginProps = {
  login: {
    employee?: Employee;
    login: () => Promise<void>;
    logout: () => void;
  };
};

export const initialState = {};
type States = {
  employee?: Employee;
};

type ActionSET_EMPLOYEE = {
  type: "SET_EMPLOYEE";
  payload: { employeeId: string; employeeName: string };
};
type ActionCLEAR_EMPLOYEE = { type: "CLEAR_EMPLOYEE" };
type Actions = ActionSET_EMPLOYEE | ActionCLEAR_EMPLOYEE;

export const loginReducer = (state: States, action: Actions): States => {
  switch (action.type) {
    case "SET_EMPLOYEE": {
      const { employeeId, employeeName } = action.payload;
      return { ...state, employee: { employeeId, employeeName } };
    }
    case "CLEAR_EMPLOYEE": {
      return initialState;
    }
  }
};

type Props = {
  render: (login: LoginProps) => ReactNode;
} & RepositoriesProps &
  NoticeProps;
export const Login: FC<Props> = ({
  render,
  loginRepository,
  showProgress,
  showMessage,
}: Props) => {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  async function login(): Promise<void> {
    await showProgress(async () => {
      // TODO 動作確認用
      await loginRepository.wait3();

      await loginRepository
        .login()
        .then((employee) => {
          dispatch({
            type: "SET_EMPLOYEE",
            payload: {
              employeeId: employee.employeeId,
              employeeName: employee.employeeName,
            },
          });
          showMessage("success", "ログイン成功");
        })
        .catch(() => showMessage("error", "ログイン失敗"));
    });
  }

  function logout(): void {
    dispatch({ type: "CLEAR_EMPLOYEE" });
  }

  const p = { login: { ...state, login, logout } };

  return <>{render(p)}</>;
};
