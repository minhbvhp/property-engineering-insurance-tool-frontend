import queryString from "query-string";

export const sendRequest = async <T>(props: IRequest) => {
  const {
    url,
    method,
    body,
    queryParams = {},
    useCredentials = false,
    headers = {},
    nextOption = {},
  } = props;

  const baseUrl = process.env.BACKEND_URL || "";
  let fullUrl = `${baseUrl}${url}`;

  const options: any = {
    method: method,
    headers: new Headers({ "content-type": "application/json", ...headers }),
    body: body ? JSON.stringify(body) : null,
    ...nextOption,
  };

  if (useCredentials) {
    options.credentials = "include";
  }

  if (queryParams) {
    fullUrl += `?${queryString.stringify(queryParams)}`;
  }

  try {
    const response = await fetch(fullUrl, options);

    if (response.ok) {
      return (await response.json()) as T;
    } else {
      const errorBody = await response.json();
      throw {
        statusCode: response.status,
        message: errorBody?.message ?? "Unknown error occurred",
        error: errorBody?.error ?? "Unknown error",
      };
    }
  } catch (error: any) {
    if (!error.statusCode) {
      return {
        statusCode: 500,
        message: "Máy chủ không phản hồi",
        error: error?.error || "Network error",
      } as T;
    }

    return error;
  }
};
