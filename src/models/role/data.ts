"use server";

import { auth } from "@/auth";
import { IRole } from "@/models/role/definition";

import { sendRequest } from "@/utils/api";

export async function getAllRoles() {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<IRole>>({
      method: "GET",
      url: "/api/roles",
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      nextOption: {
        next: { tags: ["list-roles"] },
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
