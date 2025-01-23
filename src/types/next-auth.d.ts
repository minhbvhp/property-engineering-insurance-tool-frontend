import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IAccount extends ILogin {
  avatar: string;
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    refresh_token: string;
    user: IAccount;
    access_expire: number;
    error: string;
  }
}

declare module "next-auth" {
  interface Session {
    access_token: string;
    refresh_token: string;
    user: IAccount;
    access_expire: number;
    error: string;
  }
}
