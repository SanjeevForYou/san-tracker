export class FetchWrapper {
  public static get = async <T>(
    url: string,
    config?: RequestInit
  ): Promise<T> => {
    const init: RequestInit = {
      mode: "cors",
      method: "get",
      headers: {
        "Accept-Type": "application/json",
      },
      ...config,
    };
    return await FetchWrapper.http<T>(url, init);
  };

  public static post = async <T, U>(
    path: string,
    body: T,
    config?: RequestInit
  ): Promise<U> => {
    const init = {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      ...config,
    };
    return await FetchWrapper.http<U>(path, init);
  };

  public static put = async <T, U>(
    path: string,
    body: any,
    config?: RequestInit
  ): Promise<U> => {
    const init = { method: "put", body: JSON.stringify(body), ...config };
    return await FetchWrapper.http<U>(path, init);
  };

  public static http = async <T>(
    url: string,
    requestInit: RequestInit
  ): Promise<T> => {
    if (!url.match("api/login")) {
      requestInit.headers = {
        ...(requestInit.headers && requestInit.headers),
        Authorization: `${localStorage.getItem("token")}`,
      };
    }
    const request: Request = new Request(url, requestInit);

    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json().catch(() => {
      throw new Error("Error parsing the response");
    });
  };
}
