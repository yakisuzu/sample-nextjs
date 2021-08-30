import { apiDao, ApiDao } from "@/domain/ApiDao";
import { apiUrlPath } from "@/domain/ApiUrlPathValue";

export type Employee = {
  employeeId: string;
  employeeName: string;
};

export class LoginRepository {
  constructor(private apiDao: ApiDao) {}

  async login(): Promise<Employee> {
    return this.apiDao.fetchJson<Employee>({
      method: "GET",
      url: apiUrlPath.user,
    });
  }

  async wait3(): Promise<void> {
    // TODO 動作確認用
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 3000);
    });
  }
}

export const loginRepository = new LoginRepository(apiDao);
