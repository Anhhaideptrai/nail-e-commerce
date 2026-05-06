export interface ApiClientOptions {
  baseUrl: string;
  fetcher?: typeof fetch;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
  }
}

export function createApiClient({
  baseUrl,
  fetcher = fetch,
}: ApiClientOptions) {
  async function request<TResponse>(
    path: string,
    init?: RequestInit,
  ): Promise<TResponse> {
    const response = await fetcher(new URL(path, baseUrl), {
      headers: {
        'content-type': 'application/json',
        ...init?.headers,
      },
      ...init,
    });

    if (!response.ok) {
      throw new ApiError(response.statusText, response.status);
    }

    return response.json() as Promise<TResponse>;
  }

  return {
    get: <TResponse>(path: string) => request<TResponse>(path),
    post: <TResponse, TBody>(path: string, body: TBody) =>
      request<TResponse>(path, {
        body: JSON.stringify(body),
        method: 'POST',
      }),
  };
}
