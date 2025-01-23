"use server";

import { auth } from "@/auth";
import { IRolePermissionMapping } from "@/models/role-permission-mapping/definition";

import { sendRequest } from "@/utils/api";

export async function getAllRolePermissionMappings() {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<IRolePermissionMapping[]>>({
      method: "GET",
      url: "/api/role-permission-mappings",
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      nextOption: {
        next: { tags: ["list-role-permission-mappings"] },
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
