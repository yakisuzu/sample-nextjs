import { config } from "@/domain/ConfigDao";

type HttpParamMethod = "GET" | "DELETE";
type HttpBodyMethod = "POST" | "PUT";

type HttpParams = Record<string, string | number | boolean>;
type HttpBody = Record<string, any>;

type FetchOption = {
  method: HttpParamMethod | HttpBodyMethod;
  url: string;
  args?: HttpParams | HttpBody;
};

export class ApiDao {
  constructor(private accessKey: string) {}

  private async paramFetch(
    method: HttpParamMethod,
    url: string,
    params: HttpParams = {}
  ): Promise<Response> {
    const paramString = Object.keys(params)
      .map((key) => `${key}=${String(params[key])}`)
      .join("&");
    const urlParams = `${url}?${paramString}`;
    const requestInit: RequestInit = {
      method,
      cache: "no-cache",
      headers: {
        "X-Access-Key": this.accessKey,
      },
    };
    console.debug({ urlParams, requestInit });
    return fetch(urlParams, requestInit).catch((e: Error) => {
      console.error({ name: e.name, message: e.message });
      throw e;
    });
  }

  private async bodyFetch(
    method: HttpBodyMethod,
    url: string,
    body: HttpBody = {}
  ): Promise<Response> {
    const requestInit: RequestInit = {
      method,
      body: JSON.stringify(body),
      cache: "no-cache",
      headers: {
        "X-Access-Key": this.accessKey,
        "Content-Type": "application/json",
      },
    };
    console.debug({ url, requestInit });
    return fetch(url, requestInit).catch((e: Error) => {
      console.error({ name: e.name, message: e.message });
      throw e;
    });
  }

  async fetchResponse(option: FetchOption): Promise<Response> {
    const { method, url, args } = option;
    switch (method) {
      case "GET":
      case "DELETE":
        return this.paramFetch(method, url, args);
      case "POST":
      case "PUT":
        return this.bodyFetch(method, url, args);
    }
  }

  async fetchJson<R>(option: FetchOption): Promise<R> {
    return this.fetchResponse(option).then((r) => r.json()) as Promise<R>;
  }
}

export const apiDao = new ApiDao(config.API_ACCESS_KEY);
