"use server";

import { auth } from "@/auth";
import { sendRequest } from "@/utils/api";

export async function getMyPermissions() {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<IPermission[]>>({
      method: "GET",
      url: "/api/auth/my-permissions",
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
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
