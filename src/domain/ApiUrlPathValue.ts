import { config } from "@/domain/ConfigDao";

// type ApiUrlPath = string
export const apiUrlPath = {
  user: `${config.API_URL}/v1/user`,
};
