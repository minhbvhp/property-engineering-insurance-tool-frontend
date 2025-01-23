export {};

declare global {
  interface IRequest {
    url: string;
    method: string;
    body?: { [key: string]: any };
    queryParams?: any;
    useCredentials?: boolean;
    headers?: any;
    nextOption?: any;
  }

  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }

  interface ILogin {
    id: string;
    email: string;
    nameVN: string;
    nameEN: string;
    role: {
      name: string;
    };
    gender: {
      titleVN: string;
      titleEN: string;
    };
    access_token: string;
    refresh_token: string;
  }

  interface IRefresh {
    access_token: string;
    refresh_token: string;
  }

  interface IPermission {
    action: string;
    subject: string;
  }
}
