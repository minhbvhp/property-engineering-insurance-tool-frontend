"use server";

import { auth } from "@/auth";
import { IUserData } from "@/models/user/definition";
import { sendRequest } from "@/utils/api";

export async function getAllUsers(current: number, pageSize: number) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<IUserData>>({
      method: "GET",
      url: "/api/users",
      queryParams: {
        current,
        pageSize,
      },
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      nextOption: {
        next: { tags: ["list-users"] },
      },
    });

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
      data: null,
    };
  }
}
