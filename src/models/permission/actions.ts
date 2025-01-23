"use server";

import { auth } from "@/auth";
import {
  ICreatePermissionDto,
  IEditPermissionDto,
  IPermission,
} from "@/models/permission/definition";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

export async function createPermission(payload: ICreatePermissionDto) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<IPermission>>({
      method: "POST",
      url: "/api/permissions",
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      body: { ...payload },
    });

    if (!res.error) {
      revalidateTag("list-permissions");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}

export async function editPermission(id: string, payload: IEditPermissionDto) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<IPermission>>({
      method: "PATCH",
      url: `/api/permissions/${id}`,
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      body: { ...payload },
    });

    if (!res.error) {
      revalidateTag("list-permissions");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}

export async function deletePermanentlyPermission(id: string) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<IPermission>>({
      method: "DELETE",
      url: `/api/permissions/${id}`,
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    });

    if (!res.error) {
      revalidateTag("list-permissions");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}
