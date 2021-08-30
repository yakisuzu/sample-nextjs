import getConfig from "next/config";

export type Config = {
  API_URL: string;
  API_ACCESS_KEY: string;
};

const { publicRuntimeConfig } = getConfig();

export const config: Config = publicRuntimeConfig;
