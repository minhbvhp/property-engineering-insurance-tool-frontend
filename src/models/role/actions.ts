"use server";

import { auth } from "@/auth";
import { ICreateRoleDto, IEditRoleDto, IRole } from "@/models/role/definition";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

export async function createRole(payload: ICreateRoleDto) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<IRole>>({
      method: "POST",
      url: "/api/roles",
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      body: { ...payload },
    });

    if (!res.error) {
      revalidateTag("list-roles");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}

export async function editRole(id: string, payload: IEditRoleDto) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<IRole>>({
      method: "PATCH",
      url: `/api/roles/${id}`,
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      body: { ...payload },
    });

    if (!res.error) {
      revalidateTag("list-roles");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}

export async function deletePermanentlyRole(id: string) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<IRole>>({
      method: "DELETE",
      url: `/api/roles/${id}`,
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    });

    if (!res.error) {
      revalidateTag("list-roles");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}
