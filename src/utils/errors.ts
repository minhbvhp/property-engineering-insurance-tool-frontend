import { AuthError } from "next-auth";

export class CustomAuthError extends AuthError {
  static type: string;

  constructor(message?: any) {
    super();

    this.type = message;
  }
}

export class InvalidCredentialsError extends AuthError {
  static type = "Email hoặc mật khẩu không chính xác";
}

export class NotExistedAccountError extends AuthError {
  static type = "Email không tồn tại";
}
