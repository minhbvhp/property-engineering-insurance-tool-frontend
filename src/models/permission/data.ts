"use server";

import { auth } from "@/auth";
import { ACTIONS, IAction, IPermission } from "@/models/permission/definition";

import { sendRequest } from "@/utils/api";

export async function getAllActions(): Promise<IAction[]> {
  return [
    { name: ACTIONS.MANAGE, description: "Toàn quyền" },
    { name: ACTIONS.CREATE, description: "Tạo" },
    { name: ACTIONS.READ, description: "Xem" },
    { name: ACTIONS.UPDATE, description: "Sửa" },
    { name: ACTIONS.DELETE, description: "Xóa" },
  ];
}

export async function getAllPermissions() {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<IPermission>>({
      method: "GET",
      url: "/api/permissions",
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      nextOption: {
        next: { tags: ["list-permissions"] },
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
