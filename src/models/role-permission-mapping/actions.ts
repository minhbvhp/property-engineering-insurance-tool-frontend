"use server";

import { auth } from "@/auth";
import {
  ICreateRolePermissionMappingsDto,
  IRolePermissionMapping,
} from "@/models/role-permission-mapping/definition";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

export async function createRolePermissionMapping(
  payload: ICreateRolePermissionMappingsDto
) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<IRolePermissionMapping>>({
      method: "POST",
      url: "/api/role-permission-mappings",
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      body: { ...payload },
    });

    if (!res.error) {
      revalidateTag("list-role-permission-mappings");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}

export async function deletePermanentlyRolePermissionMapping(id: string) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<IRolePermissionMapping>>({
      method: "DELETE",
      url: `/api/role-permission-mappings/${id}`,
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    });

    if (!res.error) {
      revalidateTag("list-role-permission-mappings");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}
